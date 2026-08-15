export type CompanyService = {
  readonly title: string;
  readonly description: string;
};

export type CompanyAddress = {
  readonly formatted: string;
  readonly streetAddress: string;
  readonly addressLocality: string;
  readonly addressRegion: string;
  readonly postalCode: string;
  readonly addressCountry: string;
};

export type CompanyConfig = {
  readonly brandName: string;
  readonly legalName: string;
  readonly relationshipStatement: string;
  readonly cin: string;
  readonly gstin: string;
  readonly registeredOffice: CompanyAddress;
  readonly state: string;
  readonly country: string;
  readonly telephone: string | null;
  readonly generalEmail: string;
  readonly domain: string;
  readonly description: string | null;
  readonly heroLede: string;
  readonly introCopy: string;
  readonly aboutWorkCopy: string;
  readonly services: readonly CompanyService[];
  readonly logo: {
    readonly original: string;
    readonly optimized: string;
    readonly mark: string;
    readonly favicon: string;
  };
  readonly media: {
    readonly hero: string | null;
  };
  readonly lastUpdated: string;
};

export const company: CompanyConfig = {
  brandName: "The Polar Media",
  legalName: "POLAR MEDIA PRIVATE LIMITED",
  relationshipStatement:
    "The Polar Media is operated by Polar Media Private Limited, a company incorporated in India.",
  cin: "U62011AP2025PTC120993",
  gstin: "37AAQCP1385G1Z0",
  registeredOffice: {
    formatted:
      "21/497-A, Chilakalapudi, Lakshmanraopuram, Machilipatnam, Krishna, Andhra Pradesh 521002, India",
    streetAddress: "21/497-A, Chilakalapudi, Lakshmanraopuram",
    addressLocality: "Machilipatnam, Krishna",
    addressRegion: "Andhra Pradesh",
    postalCode: "521002",
    addressCountry: "India",
  },
  state: "Andhra Pradesh",
  country: "India",
  telephone: "+91 94943 48091",
  generalEmail: "info@thepolarmedia.com",
  domain: "https://thepolarmedia.com",
  description:
    "The Polar Media is a media and advertising brand working across digital advertising, out-of-home media, display technology, marketing analytics, music production and AI-enabled advertising tools.",
  heroLede:
    "A media and advertising brand for digital, out-of-home, display, analytics, music production and AI-enabled tools — operated in India.",
  introCopy:
    "The Polar Media is the public-facing brand of Polar Media Private Limited, a company incorporated in India. This website publishes the legal identity of that company and the services it describes — nothing further is asserted here.",
  aboutWorkCopy:
    "Public descriptions of work are limited to six capabilities: digital and social advertising, out-of-home and digital standees, marketing data analytics, music and YouTube production under The Polar Media name, LED sales and customisation, and AI-enabled advertising tools. Client lists and campaign results are not published on this site.",
  services: [
    {
      title: "Digital & social advertising",
      description:
        "Planning and execution of digital advertising across social media and other online channels.",
    },
    {
      title: "Out-of-home & digital standees",
      description:
        "Out-of-home advertising and digital standee solutions for public, retail and commercial environments.",
    },
    {
      title: "Marketing data analytics",
      description:
        "Analysis and reporting intended to support media planning, campaign measurement and marketing decisions.",
    },
    {
      title: "Music & YouTube production",
      description:
        "Creation and promotion of songs through a YouTube channel using The Polar Media production name.",
    },
    {
      title: "LED sales & customisation",
      description:
        "Sale and customisation of LED display products for advertising and communication applications.",
    },
    {
      title: "AI tools for advertising",
      description:
        "Development of AI-enabled tools intended to support advertising content, workflows and campaign operations.",
    },
  ],
  logo: {
    original: "/brand/polar-media-logo-original.jpeg",
    optimized: "/brand/polar-media-logo.webp",
    mark: "/brand/polar-media-logo-mark.png",
    favicon: "/brand/polar-media-favicon-192.png",
  },
  media: {
    hero: null,
  },
  lastUpdated: "15 August 2026",
};

export function serviceSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function telephoneHref(value: string | null): string | undefined {
  if (!value) return undefined;
  return `tel:${value.replace(/[^+\d]/g, "")}`;
}
