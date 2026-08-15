import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { company } from "@/config/company";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${company.brandName} and its relationship with ${company.legalName}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="One brand. One accountable company."
        description={company.relationshipStatement}
      />
      <section className="section">
        <div className="container editorial-grid">
          <div className="editorial-aside"><span>01</span><p>Our identity</p></div>
          <div className="prose-block">
            <h2>The company behind the name</h2>
            <p className="large-copy">{company.brandName} is the public-facing brand operated by {company.legalName}. The legal entity is incorporated in {company.country}.</p>
            <p>{company.introCopy}</p>
          </div>
        </div>
      </section>
      <section className="section section--mist">
        <div className="container editorial-grid">
          <div className="editorial-aside"><span>02</span><p>Our work</p></div>
          <div className="prose-block">
            <h2>Media and advertising across connected channels</h2>
            <p>{company.aboutWorkCopy}</p>
            <p>Our public information focuses on the brand, its operating legal entity, and the services described on this website.</p>
            <Link className="button" href="/contact">Contact the company <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
      <section className="identity-strip">
        <div className="container identity-strip__grid">
          <div><span>Brand</span><strong>{company.brandName}</strong></div>
          <div><span>Legal entity</span><strong>{company.legalName}</strong></div>
          <div><span>Country</span><strong>{company.country}</strong></div>
        </div>
      </section>
    </>
  );
}
