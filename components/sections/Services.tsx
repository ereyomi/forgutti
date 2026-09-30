export default function Services() {
  return (
    <section id="services" className="section" data-reveal>
      <div className="wrap wrap--wide">
        <div className="section__head">
          <div className="eyebrow">
            <span className="eyebrow__line"></span>01 / Services
          </div>
          <h2 className="h2">Three ways I put AI to work.</h2>
          <p className="lead">
            Build, teach, document. Whether you need a system shipped or a team that can ship on
            its own — this is where I work.
          </p>
        </div>
        <div className="grid grid--cards">
          <article className="svc-card" data-reveal data-delay="0">
            <div className="svc-card__icon">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
                <circle cx="6" cy="7" r="2.3"></circle>
                <circle cx="20" cy="7" r="2.3"></circle>
                <circle cx="13" cy="19" r="2.3"></circle>
                <line x1="8.2" y1="8.2" x2="11.4" y2="16.9"></line>
                <line x1="17.8" y1="8.2" x2="14.6" y2="16.9"></line>
                <line x1="8.3" y1="7" x2="17.7" y2="7"></line>
              </svg>
            </div>
            <h3 className="svc-card__title">AI System Development</h3>
            <p className="svc-card__body">
              RAG systems, Claude API integrations, and TypeScript-first builds. I design the
              architecture, write the code, and ship systems that hold up in production.
            </p>
            <div className="svc-card__price">
              <span className="svc-card__price-label">From</span>
              <span className="svc-card__price-figure">€3,000</span>
            </div>
          </article>

          <article className="svc-card" data-reveal data-delay="90">
            <div className="svc-card__icon">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="var(--accent)" strokeWidth="1.4" aria-hidden="true">
                <circle cx="13" cy="13" r="2.8"></circle>
                <circle cx="13" cy="13" r="8.4" strokeDasharray="2 3.2"></circle>
                <circle cx="21.2" cy="8.4" r="1.5" fill="var(--accent)" stroke="none"></circle>
              </svg>
            </div>
            <h3 className="svc-card__title">AI Education &amp; Training</h3>
            <p className="svc-card__body">
              I teach teams and individuals to build with AI for real — hands-on workshops and
              practical guidance, not slideware. You leave able to ship on your own.
            </p>
            <div className="svc-card__price">
              <span className="svc-card__price-label">From</span>
              <span className="svc-card__price-figure">
                €5,000<span className="svc-card__price-unit">/workshop</span>
              </span>
            </div>
          </article>

          <article className="svc-card" data-reveal data-delay="180">
            <div className="svc-card__icon">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none" stroke="var(--accent)" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
                <rect x="6" y="4" width="14" height="18" rx="2.5"></rect>
                <line x1="9.2" y1="9" x2="16.8" y2="9"></line>
                <line x1="9.2" y1="13" x2="16.8" y2="13"></line>
                <line x1="9.2" y1="17" x2="13" y2="17"></line>
              </svg>
            </div>
            <h3 className="svc-card__title">AI Content</h3>
            <p className="svc-card__body">
              Tutorials, breakdowns, and guides for builders working with AI. I document what I
              build so you can skip the trial and error and ship faster.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
