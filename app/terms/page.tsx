import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Forgutti's AI system development, training, and content services.",
  openGraph: {
    title: "Terms of Service — Forgutti",
    description:
      "Terms of Service for Forgutti's AI system development, training, and content services.",
  },
};

export default function TermsPage() {
  return (
    <LegalPage eyebrow="LEGAL / Terms of Service" title="Terms of Service">
      <h3>Overview</h3>
      <p>
        These Terms of Service (&quot;Terms&quot;) govern engagements for AI system development,
        AI education &amp; training, and AI content services provided by Forgutti Unipessoal Lda
        (&quot;Forgutti&quot;, &quot;we&quot;, &quot;us&quot;) as described on this website. By
        engaging Forgutti for services, you agree to these Terms.
      </p>
      <p>
        <strong>Scope note:</strong> VistoPilot is a separate product operated by Forgutti
        Unipessoal Lda with its own website and its own terms of service, available at{" "}
        <a href="https://vistopilot.com" target="_blank" rel="noopener noreferrer">
          vistopilot.com
        </a>
        . These Terms do not apply to VistoPilot subscriptions — see VistoPilot&apos;s own terms
        for that product.
      </p>

      <h3>Services provided</h3>
      <p>Forgutti provides three categories of service:</p>
      <ul>
        <li>
          <strong>AI System Development</strong> — custom software development, including RAG
          systems, LLM API integrations, and TypeScript-first builds.
        </li>
        <li>
          <strong>AI Education &amp; Training</strong> — workshops and hands-on training for teams
          and individuals.
        </li>
        <li>
          <strong>AI Content</strong> — tutorials and guides, provided free of charge as
          educational/marketing content.
        </li>
      </ul>

      <h3>Engagement &amp; scope of work</h3>
      <p>
        Specific deliverables, timelines, and fees for development or training engagements are
        agreed on a per-engagement basis (for example, via a proposal, statement of work, or email
        confirmation) and are incorporated into these Terms by reference once agreed.
      </p>

      <h3>Payment terms</h3>
      <p>
        [PAYMENT TERMS — to be specified: invoicing cadence, accepted payment methods/processor,
        currency, and late-payment terms.]
      </p>

      <h3>Intellectual property</h3>
      <p>
        [IP OWNERSHIP — to be specified: e.g. the common freelance-development default is that the
        client owns final deliverables upon full payment, while Forgutti retains rights to
        reusable/background tooling and portfolio display rights. Confirm and replace this
        placeholder before publishing.]
      </p>

      <h3>Client responsibilities</h3>
      <p>
        Clients are responsible for providing timely access, information, and feedback reasonably
        required for Forgutti to deliver the agreed services.
      </p>

      <h3>Training &amp; workshops</h3>
      <p>
        Recording, materials licensing, and attendance terms for a specific workshop or training
        engagement will be confirmed at booking. Cancellation and refund terms for training are set
        out in our <a href="/refund-policy">Refund Policy</a>.
      </p>

      <h3>Limitation of liability</h3>
      <p>
        [LIMITATION OF LIABILITY — to be specified and ideally reviewed by a lawyer: e.g. a common
        freelance-consultancy default caps liability at fees paid in the preceding period, but the
        exact cap and carve-outs are a real legal decision that shouldn&apos;t be set without your
        sign-off.]
      </p>

      <h3>Termination</h3>
      <p>
        Either party may terminate an active engagement in accordance with the notice and wind-down
        terms set out in the applicable proposal or statement of work.
      </p>

      <h3>Governing law</h3>
      <p>
        These Terms are governed by the laws of Portugal. Forgutti Unipessoal Lda (NIF 519031075)
        is registered at Rua Comissão de Iniciativa n.º 2-A, 2.º andar, porta 212, Torre Brasil,
        2410-098 Leiria, Portugal.
      </p>

      <h3>Changes to these terms</h3>
      <p>
        We may update these Terms from time to time. Continued engagement of our services after an
        update constitutes acceptance of the revised Terms.
      </p>

      <h3>Contact</h3>
      <p>
        Questions about these Terms can be sent to{" "}
        <a href="mailto:forgutti@gmail.com">forgutti@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
