import type { MetadataRoute } from "next";

import { company } from "@/config/company";

const routes = ["", "/about", "/services", "/contact", "/privacy", "/terms"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route, index) => ({
    url: `${company.domain}${route}`,
    changeFrequency: index === 0 ? "monthly" : "yearly",
    priority: index === 0 ? 1 : route === "/contact" ? 0.8 : 0.6,
  }));
}
