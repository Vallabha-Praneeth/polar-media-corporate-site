import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { company } from "@/config/company";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy information for the ${company.brandName} corporate website.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" description={`Last updated: ${company.lastUpdated}`} />
      <article className="legal-page container">
        <section><h2>1. About this policy</h2><p>This policy explains how {company.legalName}, operating the {company.brandName} brand, handles information in connection with this corporate website and direct business communications.</p></section>
        <section><h2>2. Information collected by this website</h2><p>This website does not intentionally use analytics, advertising cookies, or tracking pixels. If you use the contact form, we receive the name, email address, subject, message, and any information you choose to include.</p></section>
        <section><h2>3. Hosting and technical logs</h2><p>Our hosting provider and related internet infrastructure may process limited technical information, such as IP addresses, browser details, request times, and requested pages, in standard server or security logs. This processing is controlled by the relevant infrastructure provider and may be used to deliver, secure, and maintain the website.</p></section>
        <section><h2>4. Email communications</h2><p>If you contact us through the form or by email, we use the information received to respond to your enquiry and maintain appropriate business records.</p></section>
        <section><h2>5. Data sharing and retention</h2><p>Contact-form submissions are transmitted through our hosting and email delivery providers to the company inbox. Information sent directly to us may be handled by service providers that support business communications or hosting. We do not state a fixed retention period here; records should be kept only as reasonably needed for the purpose received, legitimate business administration, dispute handling, or applicable requirements.</p></section>
        <section><h2>6. Your choices</h2><p>You may contact us to ask about information you have sent directly to the company or to request that communications stop. Requests will be considered in light of applicable obligations and available records.</p></section>
        <section><h2>7. Contact</h2><p>The intended corporate contact address for privacy questions is {company.generalEmail}. Email contact is temporarily unavailable while activation is pending; use the website contact form only when it is enabled.</p></section>
      </article>
    </>
  );
}
