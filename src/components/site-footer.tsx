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

function IdMark({ label }: { label: string }) {
  const width = Math.max(36, 10 + label.length * 6.4);

  return (
    <svg className="id-mark" viewBox={`0 0 ${width} 16`} width={width} height="16" aria-hidden="true" focusable="false">
      <rect width={width} height="16" rx="2" fill="#ff9933" />
      <text x={width / 2} y="12" textAnchor="middle" fill="#0a1626" fontSize="9" fontWeight="800" fontFamily="ui-sans-serif, system-ui, sans-serif" letterSpacing="0.4">
        {label}
      </text>
    </svg>
  );
}

function LocationMark() {
  return (
    <svg className="id-mark" viewBox="0 0 36 16" width="36" height="16" aria-hidden="true" focusable="false">
      <g transform="translate(10 0) scale(0.6667)">
        <path
          fill="#ff9933"
          fillRule="evenodd"
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
        />
      </g>
    </svg>
  );
}

function PhoneMark() {
  return (
    <svg className="id-mark" viewBox="0 0 36 16" width="36" height="16" aria-hidden="true" focusable="false">
      <g transform="translate(10 0) scale(0.6667)">
        <path
          fill="#ff9933"
          d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
        />
      </g>
    </svg>
  );
}

function EmailMark() {
  return (
    <svg className="id-mark" viewBox="0 0 36 16" width="36" height="16" aria-hidden="true" focusable="false">
      <g transform="translate(10 0) scale(0.6667)">
        <path
          fill="#ff9933"
          d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
        />
      </g>
    </svg>
  );
}

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
            <p className="footer-statement">The technology is built and maintained by QuantumOps Inc.</p>
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
            <p className="footer-id-line">
              <IdMark label="CIN" />
              {company.cin}
            </p>
            <p className="footer-id-line">
              <IdMark label="GSTIN" />
              {company.gstin}
            </p>
            <p className="footer-id-line footer-id-line--address">
              <LocationMark />
              {company.registeredOffice.formatted}
            </p>
            {phoneLink && company.telephone ? (
              <p className="footer-id-line">
                <PhoneMark />
                <a href={phoneLink}>{company.telephone}</a>
              </p>
            ) : null}
            <p className="footer-id-line">
              <EmailMark />
              <a href={`mailto:${company.generalEmail}`}>{company.generalEmail}</a>
            </p>
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
