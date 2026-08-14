import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { company } from "@/config/company";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing use of the ${company.brandName} corporate website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Terms of Use" description={`Last updated: ${company.lastUpdated}`} />
      <article className="legal-page container">
        <section><h2>1. About these terms</h2><p>These terms apply to your use of this website, which is operated by {company.legalName} under the {company.brandName} brand. By using the website, you acknowledge these terms.</p></section>
        <section><h2>2. Informational purpose</h2><p>The website provides general corporate and contact information. It does not by itself create a client, agency, employment, partnership, or other professional relationship, and it is not a substitute for a written agreement.</p></section>
        <section><h2>3. Acceptable use</h2><p>You must not misuse the website, attempt unauthorized access, interfere with its operation, introduce malicious code, or use its content in a way that violates applicable rights or law.</p></section>
        <section><h2>4. Intellectual property</h2><p>Unless otherwise indicated, website text, visual design, brand elements, and original materials are owned by or licensed to {company.legalName}. No right to reproduce, modify, distribute, or commercially exploit these materials is granted except as permitted by applicable law or written permission.</p></section>
        <section><h2>5. Accuracy and availability</h2><p>We aim to keep public company information accurate, but information may become outdated or require correction. The website may be changed, suspended, or unavailable without notice.</p></section>
        <section><h2>6. No warranty</h2><p>To the extent permitted by applicable law, the website is provided on an “as available” basis without promises that it will always be uninterrupted, error-free, or suitable for a particular purpose. Nothing in these terms excludes rights or responsibilities that cannot lawfully be excluded.</p></section>
        <section><h2>7. Limitation</h2><p>To the extent permitted by applicable law, the company is not responsible for indirect or consequential loss arising solely from reliance on this general informational website. Any responsibility that cannot lawfully be limited remains unaffected.</p></section>
        <section><h2>8. External links</h2><p>If external links are added in the future, they will be provided for convenience. The company does not control third-party websites or their content and does not adopt them merely by linking.</p></section>
        <section><h2>9. Governing law</h2><p>These terms are governed by the laws of India. Any dispute will be subject to the jurisdiction of a court of competent jurisdiction, subject to applicable law.</p></section>
        <section><h2>10. Contact</h2><p>The intended corporate contact address for questions about these terms is {company.generalEmail}. Email contact is temporarily unavailable while activation is pending; use the website contact form only when it is enabled.</p></section>
      </article>
    </>
  );
}
