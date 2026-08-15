import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { company, telephoneHref } from "@/config/company";

export const metadata: Metadata = {
  title: "Contact",
  description: `Official contact details for ${company.brandName}, operated by ${company.legalName}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const phoneLink = telephoneHref(company.telephone);

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s start with a clear conversation."
        description="For company and service enquiries, contact us through our corporate email address."
      />
      <section className="section">
        <div className="container contact-grid">
          <article className="contact-card">
            <span className="contact-card__symbol" aria-hidden="true">@</span>
            <p className="eyebrow">General enquiries</p>
            <h2>Email</h2>
            <p className="contact-card__email">
              <a href={`mailto:${company.generalEmail}`}>{company.generalEmail}</a>
            </p>
            <p className="contact-card__note">
              Contact our team for company, partnership and service enquiries.
            </p>
          </article>
          <article className="contact-card">
            <span className="contact-card__symbol" aria-hidden="true">☎</span>
            <p className="eyebrow">Company telephone</p>
            <h2>Phone</h2>
            {phoneLink && company.telephone ? (
              <p className="contact-card__email">
                <a href={phoneLink}>{company.telephone}</a>
              </p>
            ) : null}
            <p className="contact-card__note">Company contact and WhatsApp business number.</p>
          </article>
          <article className="contact-card contact-card--wide">
            <span className="contact-card__symbol" aria-hidden="true">⌖</span>
            <p className="eyebrow">Registered office</p>
            <h2>Visit by appointment</h2>
            <address>{company.registeredOffice.formatted}</address>
          </article>
        </div>
        <div className="container official-note">
          <p><strong>Official company identity</strong></p>
          <p>{company.brandName} is operated by {company.legalName}.</p>
        </div>
      </section>
    </>
  );
}
