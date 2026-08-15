import Link from "next/link";

import { company, telephoneHref } from "@/config/company";
import { BrandMark } from "@/components/site-header";

const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter() {
  const phoneLink = telephoneHref(company.telephone);

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-brand">
            <Link href="/" className="brand-link brand-link--footer">
              <BrandMark />
              <span className="brand-wordmark">The Polar Media</span>
            </Link>
            <p>Operated by {company.legalName}</p>
            <p className="footer-statement">{company.relationshipStatement}</p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="footer-label">Explore</p>
            <ul className="footer-links">
              {footerLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="footer-contact">
            <p className="footer-label">Company details</p>
            <p>CIN: {company.cin}</p>
            <p>GSTIN: {company.gstin}</p>
            <p>{company.registeredOffice.formatted}</p>
            {phoneLink && company.telephone ? <p><a href={phoneLink}>{company.telephone}</a></p> : null}
            <p><a href={`mailto:${company.generalEmail}`}>{company.generalEmail}</a></p>
          </address>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {company.legalName}. All rights reserved.</p>
          <p>India</p>
        </div>
      </div>
    </footer>
  );
}
