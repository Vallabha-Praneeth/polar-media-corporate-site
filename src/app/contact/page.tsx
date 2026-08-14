import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { company } from "@/config/company";

export const metadata: Metadata = {
  title: "Contact",
  description: `Official contact details for ${company.brandName}, operated by ${company.legalName}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const isContactFormEnabled = process.env.CONTACT_FORM_ENABLED === "true";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s start with a clear conversation."
        description="For company and service enquiries, use the form when available. Our intended corporate email address is shown below."
      />
      <section className="section">
        <div className="container contact-grid">
          <article className="contact-card">
            <span className="contact-card__symbol" aria-hidden="true">@</span>
            <p className="eyebrow">General enquiries</p>
            <h2>Email</h2>
            <p className="contact-card__email">{company.generalEmail}</p>
            <p className="contact-card__note">Displayed for company identity only. Email contact is temporarily unavailable while activation is pending.</p>
          </article>
          <article className="contact-card">
            <span className="contact-card__symbol" aria-hidden="true">⌖</span>
            <p className="eyebrow">Registered office</p>
            <h2>Visit by appointment</h2>
            <address>{company.registeredOffice.formatted}</address>
          </article>
        </div>
        <div className="container contact-form-shell">
          <ContactForm enabled={isContactFormEnabled} />
        </div>
        <div className="container official-note">
          <p><strong>Official company identity</strong></p>
          <p>{company.brandName} is operated by {company.legalName}.</p>
        </div>
      </section>
    </>
  );
}
