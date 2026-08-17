import Image from "next/image";
import Link from "next/link";

import { HeaderCta } from "@/components/header-cta";
import { StaggeredMenu } from "@/components/staggered-menu/staggered-menu";
import { company } from "@/config/company";

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about the company", link: "/about" },
  { label: "Services", ariaLabel: "View our services", link: "/services" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
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
        <div className="site-header__actions">
          <HeaderCta />
          <StaggeredMenu
            position="right"
            items={menuItems}
            displaySocials={false}
            displayItemNumbering
            hideLogo
            menuButtonColor="#0a1626"
            openMenuButtonColor="#0a1626"
            changeMenuColorOnOpen
            colors={["#00d7f2", "#0a1626"]}
            accentColor="#00d7f2"
            closeOnClickAway
          />
        </div>
      </div>
    </header>
  );
}
