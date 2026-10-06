import GatedLink from "@/components/GatedLink";

export default function Products() {
  return (
    <section id="products" className="section" data-reveal>
      <div className="wrap wrap--wide">
        <div className="section__head">
          <div className="eyebrow">
            <span className="eyebrow__line"></span>01 / Building
          </div>
          <h2 className="h2">What I&apos;m building.</h2>
          <p className="lead">
            Products shipping under the Forgutti name — built on the same systems I deliver for
            clients.
          </p>
        </div>
        <div className="grid grid--products">
          <article className="product-card" data-reveal data-delay="0">
            <div className="product-card__banner product-card__banner--logo" aria-hidden="true">
              <div className="product-card__hatch"></div>
              <div className="product-card__radial"></div>
              <img className="product-card__logo" src="/assets/vessero-mark.svg" alt="" />
            </div>
            <div className="product-card__body">
              <h3 className="product-card__title">Vessero</h3>
              <p className="product-card__text">
                An AI creative studio — image, video, sound and motion from the best models, finished
                on one canvas with captions, branding and variations, and priced before every run.
              </p>
              <div className="product-card__pricing">
                <span className="product-card__price-label">Plans from</span>
                <span className="product-card__price-figure">
                  $15<span className="product-card__price-unit">/mo</span>
                </span>
                <span className="product-card__price-caption">Free to explore — pay only when you run</span>
              </div>
              <GatedLink
                href="https://vessero.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--accent-outline"
                gate={{
                  source: "product",
                  label: "vessero",
                  title: "Try Vessero free",
                  body: "Enter your email to continue to Vessero — the AI creative studio for image, video, sound and motion.",
                  cta: "Continue to Vessero ↗",
                  done: "Your email is saved — Vessero is opening now.",
                }}
              >
                Try Vessero free ↗
              </GatedLink>
            </div>
          </article>

          <article className="product-card" data-reveal data-delay="90">
            <div className="product-card__banner product-card__banner--logo" aria-hidden="true">
              <div className="product-card__hatch"></div>
              <div className="product-card__radial"></div>
              <img className="product-card__logo" src="/assets/vistopilot-mark.svg" alt="" />
            </div>
            <div className="product-card__body">
              <h3 className="product-card__title">VistoPilot</h3>
              <p className="product-card__text">
                An AI-powered relocation guide for people moving to Portugal — visa guidance,
                personalised step-by-step plans, and local discovery, with access to vetted
                immigration lawyers.
              </p>
              <div className="product-card__pricing">
                <span className="product-card__price-label">Pro plan</span>
                <span className="product-card__price-figure">
                  €6.99<span className="product-card__price-unit">/mo</span>
                </span>
                <span className="product-card__price-caption">Free plan also available</span>
              </div>
              <GatedLink
                href="https://vistopilot.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--accent-outline"
                gate={{
                  source: "product",
                  label: "vistopilot",
                  title: "Try VistoPilot free",
                  body: "Enter your email to continue to VistoPilot — AI-powered relocation guidance for your move to Portugal.",
                  cta: "Continue to VistoPilot ↗",
                  done: "Your email is saved — VistoPilot is opening now.",
                }}
              >
                Try VistoPilot free ↗
              </GatedLink>
            </div>
          </article>

          <article className="pipeline-card" data-reveal data-delay="180">
            <div className="pipeline-card__plus" aria-hidden="true">+</div>
            <h3 className="pipeline-card__title">Next in the pipeline</h3>
            <p className="pipeline-card__text">
              Something new is always in the works. Follow along to see what ships next under
              Forgutti.
            </p>
            <GatedLink
              className="btn btn--accent-outline"
              gate={{
                source: "updates",
                title: "Get updates",
                body: "New products are always in the works. Leave your email and I'll send updates when things ship under Forgutti.",
                cta: "Keep me posted ↗",
                done: "You're on the list — I'll email you when something new ships.",
              }}
            >
              Get updates ↗
            </GatedLink>
          </article>
        </div>
      </div>
    </section>
  );
}
