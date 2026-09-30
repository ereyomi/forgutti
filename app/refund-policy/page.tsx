import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description:
    "Refund and cancellation policy for Forgutti's AI system development, training, and content services.",
  openGraph: {
    title: "Refund & Cancellation Policy — Forgutti",
    description:
      "Refund and cancellation policy for Forgutti's AI system development, training, and content services.",
  },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage eyebrow="LEGAL / Refund & Cancellation Policy" title="Refund & Cancellation Policy">
      <h3>Overview</h3>
      <p>
        This policy explains refund and cancellation terms for Forgutti Unipessoal Lda&apos;s AI
        system development, training, and content services described on this website.
      </p>
      <p>
        <strong>Scope note:</strong> VistoPilot is a separate product with its own refund policy,
        published at{" "}
        <a href="https://vistopilot.com" target="_blank" rel="noopener noreferrer">
          vistopilot.com
        </a>
        . This page does not apply to VistoPilot subscriptions.
      </p>

      <h3>Custom development engagements</h3>
      <p>
        [CUSTOM DEV REFUNDS — to be specified. Development work is typically milestone- or
        deposit-based; a common default is that fees for work already performed are
        non-refundable, while deposits for not-yet-started work may be refunded at
        Forgutti&apos;s discretion. Confirm and replace this placeholder before publishing.]
      </p>

      <h3>Training &amp; workshops</h3>
      <p>
        [CANCELLATION WINDOW — to be specified, e.g. a full refund if cancelled a set number of
        days before the session, and no refund after materials are sent or the session begins.]
      </p>

      <h3>AI Content</h3>
      <p>
        Not applicable — tutorials and guides are provided free of charge and are not a paid
        service.
      </p>

      <h3>How to request a refund</h3>
      <p>
        To request a refund, email{" "}
        <a href="mailto:forgutti@gmail.com">forgutti@gmail.com</a> with your engagement or invoice
        details. [Specify expected processing/turnaround time.]
      </p>

      <h3>Payment processor</h3>
      <p>
        Payments may be processed via Stripe. Stripe&apos;s own dispute-resolution process may run
        in parallel to any refund request made directly to us.
      </p>

      <h3>Contact</h3>
      <p>
        Questions about this policy can be sent to{" "}
        <a href="mailto:forgutti@gmail.com">forgutti@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
