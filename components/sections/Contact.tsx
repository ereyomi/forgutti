import GatedLink from "@/components/GatedLink";

export default function Contact() {
  return (
    <section id="contact" className="section" data-reveal>
      <div className="wrap contact">
        <div className="contact__glow" aria-hidden="true"></div>
        <div className="contact__inner">
          <div className="eyebrow eyebrow--center">
            <span className="eyebrow__line"></span>
            06 / Let&apos;s build
            <span className="eyebrow__line"></span>
          </div>
          <h2 className="h2 h2--contact">Ready to build with AI?</h2>
          <p className="lead contact__lead">
            Whether you need a custom AI system built or want to upskill your team — let&apos;s
            talk.
          </p>
          <a href="mailto:forgutti@gmail.com" className="btn btn--primary btn--lg">
            Get in touch <span aria-hidden="true">↗</span>
          </a>
          <div className="contact__email">forgutti@gmail.com</div>
          <div className="contact__community">
            <div className="contact__community-label">Or:</div>
            <GatedLink
              href="https://t.me/+EWyPkSQU3cg0MzQ0"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--ghost btn--wide"
              gate={{
                source: "community",
                label: "contact-section",
                title: "Join the community",
                body: "Leave your email to get the Telegram invite — plus occasional notes on what I'm shipping.",
                cta: "Get the invite ↗",
                done: "Your email is saved — the Telegram invite is opening now.",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--accent)" aria-hidden="true">
                <path d="M21.94 4.66a1.2 1.2 0 0 0-1.27-.2L3.4 11.2c-.86.35-.83 1.6.05 1.9l4.3 1.43 1.63 5.02a.9.9 0 0 0 1.5.37l2.4-2.32 4.48 3.3a1.2 1.2 0 0 0 1.88-.74l3.2-14.8a1.2 1.2 0 0 0-.4-1.7ZM9.7 14.1l8.2-5.43-6.7 6.06a1 1 0 0 0-.32.6l-.27 1.96-.91-3.19Z" />
              </svg>
              Join my community <span aria-hidden="true">↗</span>
            </GatedLink>
          </div>
        </div>
      </div>
    </section>
  );
}
