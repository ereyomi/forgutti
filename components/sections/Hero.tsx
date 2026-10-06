import HeroCanvas from "@/components/HeroCanvas";
import GatedLink from "@/components/GatedLink";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <HeroCanvas />
      <div className="hero__glow" aria-hidden="true"></div>
      <div className="hero__vignette" aria-hidden="true"></div>

      <div className="hero__inner">
        <div className="hero__badge" data-anim>
          <span className="dot dot--pulse" aria-hidden="true"></span>
          AI systems · education · content
        </div>
        <h1 className="hero__title">
          AI systems,<br />built <span className="accent">right.</span>
        </h1>
        <p className="hero__lead">
          I design and ship production AI — RAG pipelines, Claude-powered assistants, the systems
          behind them — and teach teams to build it themselves. No buzzwords, just working
          software.
        </p>
        <div className="hero__actions">
          <a href="mailto:forgutti@gmail.com" className="btn btn--primary btn--md">
            Send me a mail <span aria-hidden="true">↗</span>
          </a>
          <GatedLink
            href="#products"
            className="btn btn--ghost btn--md"
            gate={{
              source: "hero-products",
              title: "See my work",
              body: "Leave your email to explore the products I'm building under Forgutti — and get updates when new things ship.",
              cta: "Show me ↗",
              done: "Your email is saved — scrolling to my work.",
            }}
          >
            See my work
          </GatedLink>
        </div>
        <div className="hero__email">forgutti@gmail.com</div>
        <div className="hero__now">
          <a href="#products" className="now-link">
            <span className="dot dot--pulse" data-anim aria-hidden="true"></span>
            Currently building <span className="accent-soft">VISTO Pilot</span> ↗
          </a>
        </div>
      </div>

      <a href="#products" className="scroll-cue" aria-label="Scroll to products">
        <span className="scroll-cue__label">Scroll</span>
        <span className="scroll-cue__rail">
          <span className="scroll-cue__drop" data-anim></span>
        </span>
      </a>
    </section>
  );
}
