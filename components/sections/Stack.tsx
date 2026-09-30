const GROUPS: { label: string; delay: number; pills: string[]; first?: boolean }[] = [
  {
    label: "Frontend",
    delay: 0,
    first: true,
    pills: [
      "Angular 2–17",
      "React",
      "Next.js",
      "TypeScript",
      "RxJS",
      "NgRx",
      "Tailwind CSS",
      "Storybook",
      "Web Components",
    ],
  },
  {
    label: "Backend",
    delay: 70,
    pills: ["NestJS", "Node.js", "REST APIs", "WebSockets", "TypeORM", "Redis", "Microservices", "Python"],
  },
  {
    label: "Data",
    delay: 140,
    pills: ["PostgreSQL", "MySQL", "Firebase", "Supabase", "pgvector", "IndexedDB"],
  },
  {
    label: "AI & Automation",
    delay: 210,
    pills: [
      "LLM APIs",
      "RAG",
      "Embeddings",
      "Structured outputs",
      "Document extraction",
      "Prompt engineering",
      "Claude Code",
      "Cursor",
    ],
  },
  {
    label: "Cloud & Quality",
    delay: 280,
    pills: [
      "Azure",
      "Docker",
      "Vercel",
      "GitHub Actions",
      "GitLab CI",
      "Jenkins",
      "Jest",
      "Playwright",
      "Cypress",
      "Sentry",
    ],
  },
  {
    label: "Forward-deployed",
    delay: 350,
    pills: [
      "Stakeholder discovery",
      "Client demos",
      "Requirement shaping",
      "Delivery scoping",
      "Agile / Scrum",
      "Mentoring",
    ],
  },
];

export default function Stack() {
  return (
    <section id="stack" className="section section--bordered" data-reveal>
      <div className="wrap wrap--wide stack">
        <div className="stack__intro">
          <div className="eyebrow">
            <span className="eyebrow__line"></span>02 / The stack
          </div>
          <h2 className="h2">How I build.</h2>
          <p className="lead lead--tight">
            9+ years shipping production software across banking, fintech, industrial automation,
            education, and health — currently building regulated banking systems for BNP Paribas
            Portugal. Type-safe end to end, chosen for reliability over novelty.
          </p>
          <div className="mono-note">// full-stack · forward-deployed</div>
        </div>
        <div className="stack__groups">
          {GROUPS.map((group) => (
            <div
              key={group.label}
              className={group.first ? "stack-group stack-group--first" : "stack-group"}
              data-reveal
              data-delay={group.delay}
            >
              <div className="stack-group__head">
                <span className="stack-group__label">{group.label}</span>
                <span className="stack-group__rule"></span>
              </div>
              <div className="pills">
                {group.pills.map((pill) => (
                  <span key={pill} className="pill">
                    {pill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
