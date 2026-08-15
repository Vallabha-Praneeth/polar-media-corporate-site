"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

import "./magic-bento.css";

const TARGET_SELECTOR = ".button, .hero-card, .service-card, .contact-card, .contact-form";
const CARD_SELECTOR = ".hero-card, .service-card, .contact-card, .contact-form";
const BUTTON_SELECTOR = ".button";
const GLOW_COLOR = "0, 215, 242";
const SPOTLIGHT_RADIUS = 300;
const MOBILE_BREAKPOINT = 768;

function shouldDisable(): boolean {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return window.innerWidth <= MOBILE_BREAKPOINT;
}

function updateGlow(card: HTMLElement, mouseX: number, mouseY: number, glow: number, radius: number) {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty("--glow-x", `${relativeX}%`);
  card.style.setProperty("--glow-y", `${relativeY}%`);
  card.style.setProperty("--glow-intensity", glow.toString());
  card.style.setProperty("--glow-radius", `${radius}px`);
}

export function MagicGlowRoot() {
  useEffect(() => {
    if (shouldDisable()) return;

    const proximity = SPOTLIGHT_RADIUS * 0.5;
    const fadeDistance = SPOTLIGHT_RADIUS * 0.75;

    const spotlight = document.createElement("div");
    spotlight.className = "magic-border-spotlight";
    spotlight.style.background = `radial-gradient(circle,
      rgba(${GLOW_COLOR}, 0.15) 0%,
      rgba(${GLOW_COLOR}, 0.08) 15%,
      rgba(${GLOW_COLOR}, 0.04) 25%,
      rgba(${GLOW_COLOR}, 0.02) 40%,
      rgba(${GLOW_COLOR}, 0.01) 65%,
      transparent 70%
    )`;
    document.body.appendChild(spotlight);

    const handleMouseMove = (event: MouseEvent) => {
      const targets = document.querySelectorAll<HTMLElement>(TARGET_SELECTOR);
      let minDistance = Infinity;
      let insideAnyCard = false;

      targets.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const inside =
          event.clientX >= rect.left &&
          event.clientX <= rect.right &&
          event.clientY >= rect.top &&
          event.clientY <= rect.bottom;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance =
          Math.hypot(event.clientX - centerX, event.clientY - centerY) - Math.max(rect.width, rect.height) / 2;
        const effectiveDistance = Math.max(0, distance);
        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) glowIntensity = 1;
        else if (effectiveDistance <= fadeDistance) {
          glowIntensity = (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateGlow(card, event.clientX, event.clientY, glowIntensity, SPOTLIGHT_RADIUS);
        if (inside && card.matches(CARD_SELECTOR)) insideAnyCard = true;
      });

      gsap.to(spotlight, {
        left: event.clientX,
        top: event.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity = !insideAnyCard
        ? 0
        : minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlight, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    };

    const handleClick = (event: MouseEvent) => {
      const button = (event.target as HTMLElement | null)?.closest?.(BUTTON_SELECTOR);
      if (!(button instanceof HTMLElement)) return;

      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );

      const ripple = document.createElement("div");
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${GLOW_COLOR}, 0.4) 0%, rgba(${GLOW_COLOR}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 4;
      `;
      button.appendChild(ripple);
      gsap.fromTo(
        ripple,
        { scale: 0, opacity: 1 },
        { scale: 1, opacity: 0, duration: 0.8, ease: "power2.out", onComplete: () => ripple.remove() },
      );
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("click", handleClick);
      spotlight.remove();
    };
  }, []);

  return null;
}
