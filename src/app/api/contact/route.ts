import {
  handleContactRequest,
  type ContactConfig,
} from "@/lib/contact-form";

export const runtime = "nodejs";

function getContactConfig(): ContactConfig {
  return {
    enabled: process.env.CONTACT_FORM_ENABLED === "true",
    apiKey: process.env.RESEND_API_KEY ?? "",
    fromEmail: process.env.RESEND_FROM_EMAIL ?? "",
    toEmail: process.env.CONTACT_TO_EMAIL ?? "",
  };
}

export async function POST(request: Request): Promise<Response> {
  return handleContactRequest(request, getContactConfig());
}
