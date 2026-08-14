"use client";

import { useState, type FormEvent } from "react";

import { CONTACT_LIMITS } from "@/config/contact-form";

type ContactFormProps = {
  enabled: boolean;
};

type FormStatus = {
  kind: "idle" | "submitting" | "success" | "error";
  message: string;
};

const initialStatus: FormStatus = { kind: "idle", message: "" };

export function ContactForm({ enabled }: ContactFormProps) {
  const [status, setStatus] = useState<FormStatus>(initialStatus);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!enabled || status.kind === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);
    setStatus({ kind: "submitting", message: "Sending…" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          website: formData.get("website"),
        }),
      });
      const result: unknown = await response.json();
      const message =
        typeof result === "object" &&
        result !== null &&
        "message" in result &&
        typeof result.message === "string"
          ? result.message
          : "We couldn't send your message right now. Please try again later.";

      if (!response.ok) {
        setStatus({ kind: "error", message });
        return;
      }

      form.reset();
      setStatus({ kind: "success", message });
    } catch {
      setStatus({
        kind: "error",
        message: "We couldn't send your message right now. Please try again later.",
      });
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-form__heading">
        <div>
          <p className="eyebrow">Send an enquiry</p>
          <h2>Tell us what you need.</h2>
        </div>
        {!enabled ? (
          <p className="contact-form__notice">
            The online form and corporate email contact are temporarily unavailable while the company mailbox is activated.
          </p>
        ) : null}
      </div>

      <div className="contact-form__fields">
        <label>
          <span>Name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            minLength={2}
            maxLength={CONTACT_LIMITS.name}
            required
            disabled={!enabled}
          />
        </label>
        <label>
          <span>Email</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            maxLength={CONTACT_LIMITS.email}
            required
            disabled={!enabled}
          />
        </label>
        <label className="contact-form__full">
          <span>Subject</span>
          <input
            name="subject"
            type="text"
            minLength={3}
            maxLength={CONTACT_LIMITS.subject}
            required
            disabled={!enabled}
          />
        </label>
        <label className="contact-form__full">
          <span>Message</span>
          <textarea
            name="message"
            rows={7}
            minLength={10}
            maxLength={CONTACT_LIMITS.message}
            required
            disabled={!enabled}
          />
        </label>
        <label className="contact-form__honeypot" aria-hidden="true">
          <span>Website</span>
          <input
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            maxLength={CONTACT_LIMITS.website}
            disabled={!enabled}
          />
        </label>
      </div>

      <div className="contact-form__footer">
        <button
          className="button"
          type="submit"
          disabled={!enabled || status.kind === "submitting"}
        >
          {status.kind === "submitting" ? "Sending…" : "Send enquiry"}
        </button>
        <p
          className={`contact-form__status contact-form__status--${status.kind}`}
          role="status"
          aria-live="polite"
        >
          {status.message}
        </p>
      </div>
    </form>
  );
}
