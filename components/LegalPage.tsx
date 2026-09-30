import type { ReactNode } from "react";

/* Shared shell for the legal pages (terms / privacy / refund policy). */

export default function LegalPage({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="section" style={{ paddingTop: "clamp(140px, 16vw, 190px)" }}>
      <div className="wrap legal">
        <div className="eyebrow">
          <span className="eyebrow__line"></span>
          {eyebrow}
        </div>
        <h2 className="h2">{title}</h2>
        <div className="legal__updated">Last updated: [DATE]</div>
        {children}
      </div>
    </section>
  );
}
