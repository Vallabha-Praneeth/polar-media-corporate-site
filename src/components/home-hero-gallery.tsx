"use client";

import AccordionGallery from "@/components/accordion-gallery/accordion-gallery";

const items = [
  {
    image: "/media/gallery-booth-01.png",
    label: "Exhibition booths",
    alt: "Polar Media exhibition booth with back wall, side panels and a reception counter.",
    link: "/services#out-of-home-and-digital-standees",
  },
  {
    image: "/media/gallery-booth-02.png",
    label: "Brand environments",
    alt: "Polar Media booth with logo wall, champagne graphic panels and a branded podium.",
    link: "/services#out-of-home-and-digital-standees",
  },
  {
    image: "/media/gallery-booth-03.png",
    label: "Event graphics",
    alt: "Polar Media exhibition stand with a wide graphic wall and an L-shaped display pillar.",
    link: "/services#out-of-home-and-digital-standees",
  },
  {
    image: "/media/gallery-booth-04.png",
    label: "Night displays",
    alt: "Backlit Polar Media booth on a dark floor with glowing graphic panels.",
    link: "/services#out-of-home-and-digital-standees",
  },
  {
    image: "/media/gallery-standee.jpg",
    label: "Digital standees",
    alt: "Floor-standing digital poster showing a polar bear against aurora, with the rear casing beside it.",
    link: "/services#led-sales-and-customisation",
  },
];

export function HomeHeroGallery() {
  return (
    <AccordionGallery
      className="hero-accordion"
      items={items}
      defaultIndex={2}
      expandRatio={0.52}
      trigger="hover"
      accentColor="#00d7f2"
      overlayColor="#05080d"
      textColor="#ffffff"
      height={460}
      gap={8}
      radius={6}
    />
  );
}
