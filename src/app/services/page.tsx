import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { company } from "@/config/company";

export const metadata: Metadata = {
  title: "Services",
  description: `Explore the services offered by ${company.brandName}.`,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Work grounded in real capability."
        description="Our work spans digital and out-of-home advertising, display technology, marketing analytics, music production and AI-enabled advertising tools."
      />
      <section className="section">
        <div className="container">
          <div className="service-grid service-grid--page">
            {company.services.map((service, index) => (
              <article className="service-card service-card--large" key={service.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h2>{service.title}</h2>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
