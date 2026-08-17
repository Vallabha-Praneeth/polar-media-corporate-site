"use client";

import { usePathname } from "next/navigation";

import { company } from "@/config/company";

export function HeaderCta() {
  const pathname = usePathname();

  if (pathname === "/contact") {
    return null;
  }

  return (
    <a className="button button--compact header-cta" href={`mailto:${company.generalEmail}`}>
      Get in touch
    </a>
  );
}
