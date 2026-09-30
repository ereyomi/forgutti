import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { EmailGateProvider } from "@/components/EmailGateProvider";
import ScrollProgress from "@/components/ScrollProgress";
import SiteNav from "@/components/SiteNav";
import RevealController from "@/components/RevealController";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Forgutti — AI systems, built right.",
    template: "%s — Forgutti",
  },
  description:
    "I design and ship production AI — RAG pipelines, Claude-powered assistants, and the systems behind them — and teach teams to build it themselves. No buzzwords, just working software.",
  authors: [{ name: "Forgutti" }],
  openGraph: {
    type: "website",
    title: "Forgutti — AI systems, built right.",
    description: "Custom AI builds, practical training, and writing for people who ship.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0C12",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <EmailGateProvider>
          <RevealController />
          <div className="page" id="page">
            <ScrollProgress />
            <SiteNav />
            {children}
            <Footer />
          </div>
        </EmailGateProvider>
      </body>
    </html>
  );
}
