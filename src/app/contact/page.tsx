import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { company, telephoneHref } from "@/config/company";

export const metadata: Metadata = {
  title: "Contact",
  description: `Email ${company.generalEmail} or call ${company.telephone ?? company.brandName} for company and service enquiries.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const phoneLink = telephoneHref(company.telephone);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s start with a clear conversation."
        description="Tap email or phone. We respond to company, partnership and service enquiries."
      />
      <section className="section">
        <div className="container contact-grid">
          <a className="contact-card contact-card--action" href={`mailto:${company.generalEmail}`}>
            <span className="contact-card__symbol" aria-hidden="true">@</span>
            <p className="eyebrow">General enquiries</p>
            <h2>Email</h2>
            <p className="contact-card__email">{company.generalEmail}</p>
            <p className="contact-card__note">Opens your mail app to write us.</p>
          </a>
          {phoneLink && company.telephone ? (
            <a className="contact-card contact-card--action" href={phoneLink}>
              <span className="contact-card__symbol" aria-hidden="true">☎</span>
              <p className="eyebrow">Company telephone</p>
              <h2>Phone</h2>
              <p className="contact-card__email">{company.telephone}</p>
              <p className="contact-card__note">Tap to call. WhatsApp on the same number.</p>
            </a>
          ) : null}
          <article className="contact-card contact-card--wide">
            <span className="contact-card__symbol" aria-hidden="true">⌖</span>
            <p className="eyebrow">Registered office</p>
            <h2>Visit by appointment</h2>
            <address>{company.registeredOffice.formatted}</address>
          </article>
        </div>
      </section>
    </>
  );
}
