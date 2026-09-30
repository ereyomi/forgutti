import GatedLink from "@/components/GatedLink";

export default function Products() {
  return (
    <section id="products" className="section section--bordered" data-reveal>
      <div className="wrap wrap--wide">
        <div className="section__head">
          <div className="eyebrow">
            <span className="eyebrow__line"></span>03 / Building
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

          <article className="product-card" data-reveal data-delay="90">
            <div className="product-card__banner product-card__banner--logo" aria-hidden="true">
              <div className="product-card__hatch"></div>
              <div className="product-card__radial"></div>
              <img className="product-card__logo" src="/assets/nhs-job-portal-mark.svg" alt="" />
            </div>
            <div className="product-card__body">
              <h3 className="product-card__title">NHS Job Application Support template</h3>
              <p className="product-card__text">
                AI tools and expert human review that turn the NHS person specification into a
                shortlisting-ready supporting statement, CV, and interview plan.
              </p>
              <div className="product-card__pricing">
                <span className="product-card__price-label">Status</span>
                <span className="product-card__status-value accent-soft">In development</span>
              </div>
              <GatedLink
                href="https://nhs-job-portal-template.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--accent-outline"
                gate={{
                  source: "product",
                  label: "nhs-job-application-support",
                  title: "View the NHS template",
                  body: "Enter your email to open the preview of the NHS Job Application Support template.",
                  cta: "View preview ↗",
                  done: "Your email is saved — the preview is opening now.",
                }}
              >
                View preview ↗
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
