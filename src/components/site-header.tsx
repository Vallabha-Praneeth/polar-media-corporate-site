import Image from "next/image";
import Link from "next/link";

import { company } from "@/config/company";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export function BrandMark() {
  return (
    <Image
      className="brand-mark"
      src={company.logo.mark}
      alt={company.brandName}
      width={354}
      height={290}
      priority
    />
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link href="/" className="brand-link">
          <BrandMark />
          <span className="brand-wordmark">The Polar Media</span>
        </Link>
        <nav aria-label="Primary navigation">
          <ul className="nav-list">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link className="button button--compact header-cta" href="/contact">
          Get in touch
        </Link>
      </div>
    </header>
  );
}
