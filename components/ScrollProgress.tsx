"use client";

/* Scroll progress bar at the very top of the viewport. */

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    function onScroll() {
      if (!bar) return;
      const doc = document.documentElement;
      const y = window.scrollY || window.pageYOffset || 0;
      const max = doc.scrollHeight - doc.clientHeight || 1;
      bar.style.width = Math.max(0, Math.min(100, (y / max) * 100)) + "%";
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="progress" aria-hidden="true">
      <span className="progress__bar" ref={barRef} />
    </div>
  );
}
