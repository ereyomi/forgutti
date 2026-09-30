const POSTS = [
  {
    delay: "0",
    thumb: "post-card__thumb--a",
    radial: "post-card__radial--a",
    file: "rag-pipeline.ts",
    kind: "Tutorial",
    meta: "12 min read",
    title: "Building a RAG system in TypeScript",
  },
  {
    delay: "90",
    thumb: "post-card__thumb--b",
    radial: "post-card__radial--b",
    file: "claude.client.ts",
    kind: "Guide",
    meta: "9 min read",
    title: "The Claude API: a practical guide",
  },
  {
    delay: "180",
    thumb: "post-card__thumb--c",
    radial: "post-card__radial--c",
    file: "ship-it.md",
    kind: "Essay",
    meta: "7 min read",
    title: "Designing AI systems that actually ship",
  },
];

export default function Writing() {
  return (
    <section id="writing" className="section section--bordered" data-reveal>
      <div className="wrap wrap--wide">
        <div className="section__head">
          <div className="eyebrow">
            <span className="eyebrow__line"></span>05 / Writing
          </div>
          <h2 className="h2">I write about what I build.</h2>
          <p className="lead">
            AI systems, TypeScript, and building with Claude and OpenAI — documented as I go.
          </p>
        </div>
        <div className="grid grid--cards">
          {POSTS.map((post) => (
            <a key={post.title} href="#" className="post-card" data-reveal data-delay={post.delay}>
              <div className={`post-card__thumb ${post.thumb}`}>
                <div className="post-card__hatch"></div>
                <div className={`post-card__radial ${post.radial}`}></div>
                <span className="post-card__file">{post.file}</span>
                <span className="post-card__kind">{post.kind}</span>
              </div>
              <div className="post-card__body">
                <div className="post-card__meta">{post.meta}</div>
                <h3 className="post-card__title">{post.title}</h3>
                <span className="post-card__cta">Read ↗</span>
              </div>
            </a>
          ))}
        </div>
        <div className="writing__more">
          <a
            href="https://www.instagram.com/_forgutti/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost btn--wide"
          >
            See all content <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
