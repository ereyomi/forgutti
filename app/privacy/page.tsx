import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for the Forgutti website and services.",
  openGraph: {
    title: "Privacy Policy — Forgutti",
    description: "Privacy Policy for the Forgutti website and services.",
  },
};

export default function PrivacyPage() {
  return (
    <LegalPage eyebrow="LEGAL / Privacy Policy" title="Privacy Policy">
      <h3>Overview</h3>
      <p>
        This Privacy Policy explains how Forgutti Unipessoal Lda (&quot;Forgutti&quot;,
        &quot;we&quot;, &quot;us&quot;) handles information in connection with this website and
        the AI system development, training, and content services described on it.
      </p>
      <p>
        <strong>Scope note:</strong> VistoPilot is a separate product operated by Forgutti
        Unipessoal Lda with its own privacy policy, available at{" "}
        <a href="https://vistopilot.com" target="_blank" rel="noopener noreferrer">
          vistopilot.com
        </a>
        . This policy does not cover VistoPilot&apos;s handling of user data — see
        VistoPilot&apos;s own privacy policy for that product.
      </p>

      <h3>Information we collect</h3>
      <p>
        When you choose to join our Telegram community, view one of our products, or request
        updates, we ask for your email address before opening the link. We store that email
        address together with the action that triggered the request, the page you were on, your
        browser&apos;s user-agent string, and the date and time. Beyond this, the website runs no
        analytics or tracking scripts; any other information we receive is what you choose to
        share directly — for example, by emailing us. [Review and adjust this section as data
        collection evolves.]
      </p>

      <h3>How we use information</h3>
      <p>
        We use the information you share with us to respond to your enquiries, to provide the
        invite, link, or updates you requested, to discuss and deliver contracted services, and —
        only if you&apos;ve opted in (for example, by joining our Telegram community or requesting
        updates) — to share relevant updates.
      </p>

      <h3>Third parties</h3>
      <p>
        [SUBPROCESSORS — to be specified. Name your hosting provider (e.g. Vercel) and database
        provider (e.g. Supabase/Neon) here, since captured emails are stored with them; add Stripe
        if used for invoicing, plus any email provider.] We do not sell your personal data.
      </p>

      <h3>Data retention</h3>
      <p>
        [DATA RETENTION — how long captured email addresses and engagement records are kept has
        not yet been decided; specify a retention period here before publishing.]
      </p>

      <h3>Cookies &amp; local storage</h3>
      <p>
        This site does not set tracking cookies. After you submit your email address, we store a
        small flag in your browser&apos;s local storage so that we don&apos;t ask you for it again
        on your next visit. The flag records only that the form was submitted — it contains no
        personal data and is never sent back to our servers. Clearing your browser data removes
        it.
      </p>

      <h3>Your rights</h3>
      <p>
        As Forgutti Unipessoal Lda is registered in Portugal (an EU member state), you have rights
        under the General Data Protection Regulation (GDPR), including the right to access,
        correct, or request deletion of your personal data. To exercise any of these rights,
        contact us using the details below.
      </p>

      <h3>Children&apos;s privacy</h3>
      <p>
        Our services are not directed at children, and we do not knowingly collect personal data
        from anyone under 16.
      </p>

      <h3>Changes to this policy</h3>
      <p>
        We may update this Privacy Policy from time to time. Material changes will be reflected by
        updating the &quot;Last updated&quot; date above.
      </p>

      <h3>Contact</h3>
      <p>
        Questions about this Privacy Policy, or requests relating to your data, can be sent to{" "}
        <a href="mailto:forgutti@gmail.com">forgutti@gmail.com</a>.
      </p>
    </LegalPage>
  );
}
