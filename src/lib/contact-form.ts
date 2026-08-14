import { CONTACT_LIMITS } from "../config/contact-form.ts";

const SUCCESS_MESSAGE = "Thanks. Your message has been sent.";
const INVALID_MESSAGE = "Please check your details and try again.";
const FAILURE_MESSAGE =
  "We couldn't send your message right now. Please try again later.";

type ContactSubmission = {
  name: string;
  email: string;
  subject: string;
  message: string;
  website: string;
};

export type ContactConfig = {
  enabled: boolean;
  apiKey: string;
  fromEmail: string;
  toEmail: string;
};

export type ContactSender = (
  config: ContactConfig,
  submission: ContactSubmission,
) => Promise<boolean>;

function jsonResponse(status: number, ok: boolean, message: string): Response {
  return Response.json(
    { ok, message },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function hasValidEmailShape(value: string): boolean {
  return /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/iu.test(
    value,
  );
}

function parseSubmission(value: unknown): ContactSubmission | null {
  if (!isPlainRecord(value)) return null;

  const allowedKeys = new Set(["name", "email", "subject", "message", "website"]);
  if (Object.keys(value).some((key) => !allowedKeys.has(key))) return null;

  const { name, email, subject, message, website } = value;
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof subject !== "string" ||
    typeof message !== "string" ||
    typeof website !== "string"
  ) {
    return null;
  }

  const submission = {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    subject: subject.trim(),
    message: message.trim(),
    website: website.trim(),
  };

  if (
    submission.name.length < 2 ||
    submission.name.length > CONTACT_LIMITS.name ||
    /[\u0000-\u001f\u007f]/u.test(submission.name) ||
    submission.email.length > CONTACT_LIMITS.email ||
    !hasValidEmailShape(submission.email) ||
    submission.subject.length < 3 ||
    submission.subject.length > CONTACT_LIMITS.subject ||
    /[\u0000-\u001f\u007f]/u.test(submission.subject) ||
    submission.message.length < 10 ||
    submission.message.length > CONTACT_LIMITS.message ||
    /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/u.test(submission.message) ||
    submission.website.length > CONTACT_LIMITS.website
  ) {
    return null;
  }

  return submission;
}

function isSafeSender(value: string): boolean {
  return new Set([
    "Polar Media Website <website@notifications.thepolarmedia.com>",
    "Polar Media Website <onboarding@resend.dev>",
    "onboarding@resend.dev",
  ]).has(value.trim());
}

function isValidConfig(config: ContactConfig): boolean {
  return (
    config.enabled &&
    config.apiKey.startsWith("re_") &&
    isSafeSender(config.fromEmail) &&
    config.toEmail.length <= CONTACT_LIMITS.email &&
    hasValidEmailShape(config.toEmail)
  );
}

function hasSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

async function readBodyWithinLimit(
  request: Request,
  limit: number,
): Promise<string | null> {
  if (!request.body) return "";

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > limit) {
        await reader.cancel();
        return null;
      }
      chunks.push(value);
    }
  } catch {
    return null;
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(body);
  } catch {
    return null;
  }
}

export function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/gu, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return entities[character];
  });
}

export async function sendContactWithResend(
  config: ContactConfig,
  submission: ContactSubmission,
): Promise<boolean> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.fromEmail,
      to: [config.toEmail],
      reply_to: submission.email,
      subject: `Website enquiry: ${submission.subject}`,
      text: [
        `Name: ${submission.name}`,
        `Reply email: ${submission.email}`,
        `Subject: ${submission.subject}`,
        "",
        submission.message,
      ].join("\n"),
      html: [
        `<p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>`,
        `<p><strong>Reply email:</strong> ${escapeHtml(submission.email)}</p>`,
        `<p><strong>Subject:</strong> ${escapeHtml(submission.subject)}</p>`,
        `<p><strong>Message:</strong></p><p>${escapeHtml(submission.message).replace(/\n/gu, "<br>")}</p>`,
      ].join(""),
    }),
    signal: AbortSignal.timeout(10_000),
  });

  return response.ok;
}

export async function handleContactRequest(
  request: Request,
  config: ContactConfig,
  sender: ContactSender = sendContactWithResend,
): Promise<Response> {
  if (!isValidConfig(config)) {
    return jsonResponse(503, false, FAILURE_MESSAGE);
  }

  const contentType = request.headers.get("content-type")?.split(";", 1)[0];
  const lengthHeader = request.headers.get("content-length");
  const declaredLength = lengthHeader === null ? null : Number(lengthHeader);
  if (
    contentType !== "application/json" ||
    !hasSameOrigin(request) ||
    (declaredLength !== null &&
      (!Number.isFinite(declaredLength) ||
        declaredLength < 0 ||
        declaredLength > CONTACT_LIMITS.requestBody))
  ) {
    return jsonResponse(400, false, INVALID_MESSAGE);
  }

  const rawBody = await readBodyWithinLimit(request, CONTACT_LIMITS.requestBody);
  if (rawBody === null) {
    return jsonResponse(400, false, INVALID_MESSAGE);
  }

  let parsedBody: unknown;
  try {
    parsedBody = JSON.parse(rawBody);
  } catch {
    return jsonResponse(400, false, INVALID_MESSAGE);
  }

  const submission = parseSubmission(parsedBody);
  if (!submission) {
    return jsonResponse(400, false, INVALID_MESSAGE);
  }

  if (submission.website) {
    return jsonResponse(200, true, SUCCESS_MESSAGE);
  }

  try {
    if (!(await sender(config, submission))) {
      return jsonResponse(503, false, FAILURE_MESSAGE);
    }
  } catch {
    return jsonResponse(503, false, FAILURE_MESSAGE);
  }

  return jsonResponse(200, true, SUCCESS_MESSAGE);
}
