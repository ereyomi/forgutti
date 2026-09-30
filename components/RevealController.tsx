"use client";

/* Reveal-on-scroll controller (port of initReveal in the legacy script.js).
   Renders nothing; observes every [data-reveal] element on the current page. */

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealController() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = !!(
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    if (!reduced) {
      document.documentElement.style.scrollBehavior = "smooth";
    }

    const els = Array.prototype.slice.call(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (reduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "none";
      });
      return;
    }

    els.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(22px)";
      el.style.transition =
        "opacity .7s cubic-bezier(.2,.7,.2,1), transform .7s cubic-bezier(.2,.7,.2,1)";
      const d = el.getAttribute("data-delay");
      if (d) el.style.transitionDelay = d + "ms";
    });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "none";
            obs.unobserve(el);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [pathname]);

  return null;
}
