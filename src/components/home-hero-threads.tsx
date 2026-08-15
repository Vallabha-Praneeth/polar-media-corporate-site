"use client";

import dynamic from "next/dynamic";

const WebThreads = dynamic(() => import("@/components/web-threads"), { ssr: false });

export function HomeHeroThreads() {
  return (
    <div className="home-hero__threads" aria-hidden="true">
      <WebThreads
        color1="#00D7F2"
        color2="#00768C"
        color3="#FFFFFF"
        speed={0.16}
        threadCount={6}
        frequency={4.4}
        spread={0.22}
        taper={1.0}
        position={0.52}
        fanMode="center"
        glow={0.028}
        falloff={0.58}
        thickness={1.15}
        brightness={0.72}
        opacity={0.7}
        mirror
        shimmer={false}
        grain
        grainIntensity={0.04}
        mouseInteraction
        mouseStrength={0.28}
      />
    </div>
  );
}
