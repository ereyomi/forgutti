"use client";

/* Fixed nav with blur-on-scroll. Brand links home (or to top on the home page). */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function SiteNav() {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const brandHref = isHome ? "#top" : "/#top";
  const brandLabel = isHome ? "Forgutti — back to top" : "Forgutti — back to home";

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    function onScroll() {
      const y = window.scrollY || window.pageYOffset || 0;
      nav?.classList.toggle("is-scrolled", y > 20);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="nav" id="site-nav" ref={navRef}>
      <a href={brandHref} className="brand" aria-label={brandLabel}>
        <span className="brand__mark" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        <span className="brand__name">Forgutti</span>
      </a>
    </header>
  );
}
