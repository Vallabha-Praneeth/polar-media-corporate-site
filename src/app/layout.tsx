import type { Metadata } from "next";

import { MagicGlowRoot } from "@/components/magic-bento/magic-glow-root";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { company } from "@/config/company";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(company.domain),
  title: {
    default: company.brandName,
    template: `%s | ${company.brandName}`,
  },
  description: company.relationshipStatement,
  applicationName: company.brandName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: company.domain,
    siteName: company.brandName,
    title: company.brandName,
    description: company.relationshipStatement,
    images: [
      {
        url: "/og.png",
        width: 1731,
        height: 909,
        alt: `${company.brandName} — Clear thinking. Purposeful media.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: company.brandName,
    description: company.relationshipStatement,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.brandName,
  legalName: company.legalName,
  url: company.domain,
  email: company.generalEmail,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.registeredOffice.streetAddress,
    addressLocality: company.registeredOffice.addressLocality,
    addressRegion: company.registeredOffice.addressRegion,
    postalCode: company.registeredOffice.postalCode,
    addressCountry: company.registeredOffice.addressCountry,
  },
  ...(company.telephone ? { telephone: company.telephone } : {}),
  ...(company.description ? { description: company.description } : {}),
  identifier: [
    { "@type": "PropertyValue", name: "CIN", value: company.cin },
    { "@type": "PropertyValue", name: "GSTIN", value: company.gstin },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <MagicGlowRoot />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
