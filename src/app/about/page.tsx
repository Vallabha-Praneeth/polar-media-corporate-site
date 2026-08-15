import type { Metadata } from "next";
import Image from "next/image";
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
      >
        <Image
          className="page-hero__media"
          src="/media/about-hero.png"
          alt="Digital out-of-home display on a truck wrap and a standing LED board at night."
          width={1024}
          height={576}
        />
      </PageHero>
      <section className="section">
        <div className="container editorial-grid">
          <div className="editorial-aside"><span>01</span><p>Our identity</p></div>
          <div className="prose-block">
            <h2>The company behind the name</h2>
            <div className="prose-block__body">
              <p>The Polar Media is the public-facing brand of Polar Media Private Limited, a corporate entity incorporated in India.</p>
              <p>We operate with absolute transparency. This platform serves as the definitive portal for our legal identity, corporate governance, and the suite of professional services we deliver to our global partners.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="section section--mist">
        <div className="container editorial-grid">
          <div className="editorial-aside"><span>02</span><p>Our work</p></div>
          <div className="prose-block">
            <h2>Media and advertising across connected channels</h2>
            <div className="prose-block__body">
              <p>Public descriptions of our work focus strictly on our six core capabilities:</p>
              <ul className="capability-list">
                <li>Digital &amp; Social Advertising</li>
                <li>Out-of-Home &amp; Digital Standees</li>
                <li>Marketing Data Analytics</li>
                <li>Music &amp; YouTube Production (under The Polar Media brand)</li>
                <li>Custom LED Hardware &amp; Sales</li>
                <li>AI-Enabled Advertising Tools</li>
              </ul>
              <p>In accordance with our privacy standards, we do not publish client rosters or campaign performance data. Our web portal provides direct transparency into our corporate legal identity and service offerings.</p>
            </div>
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
