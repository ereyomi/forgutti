export default function About() {
  return (
    <section id="about" className="section section--bordered" data-reveal>
      <div className="wrap about">
        <div className="about__card" data-reveal data-delay="80" aria-hidden="true">
          <div className="about__glow"></div>
          <div className="about__grid"></div>
          <div className="about__ring">
            <span className="about__initial">F</span>
          </div>
          <span className="about__spark about__spark--1"></span>
          <span className="about__spark about__spark--2"></span>
          <span className="about__spark about__spark--3"></span>
          <div className="about__caption">
            <span>FORGUTTI</span>
            <span className="accent-soft">AI ENGINEER</span>
          </div>
        </div>
        <div className="about__text">
          <div className="eyebrow">
            <span className="eyebrow__line"></span>04 / Who is Forgutti
          </div>
          <h2 className="h2 h2--about">Practical AI, built by hand.</h2>
          <p className="lead lead--about">
            I&apos;m a builder and educator focused on practical AI. I help teams ship AI-powered
            systems — from RAG pipelines to Claude-based assistants — and teach the skills to
            build them independently.
          </p>
          <p className="lead lead--about">
            No fluff, no buzzwords. Just working software, and the know-how to keep it running.
          </p>
          <div className="about__sign">— Forgutti</div>
        </div>
      </div>
    </section>
  );
}
