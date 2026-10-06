"use client";

/* Site footer — shared by all pages. Section anchors adapt to the current
   route (#services on home, /#services elsewhere). */

import Link from "next/link";
import { usePathname } from "next/navigation";
import GatedLink from "@/components/GatedLink";

const COMMUNITY_URL = "https://t.me/+EWyPkSQU3cg0MzQ0";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const anchor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <footer className="footer">
      <div className="wrap wrap--wide">
        <div className="footer__top">
          <div className="footer__brandcol">
            <div className="brand">
              <span className="brand__mark" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </span>
              <span className="brand__name">Forgutti</span>
            </div>
            <p className="footer__tagline">
              AI systems, built right. Custom builds, practical training, and writing for people
              who ship.
            </p>
          </div>
          <div className="footer__col">
            <div className="footer__heading">Navigate</div>
            <div className="footer__links">
              <a href={anchor("products")} className="footer-link">Products</a>
              <a href={anchor("services")} className="footer-link">Services</a>
              <a href={anchor("stack")} className="footer-link">Stack</a>
              <a href={anchor("writing")} className="footer-link">Writing</a>
              <a href="mailto:forgutti@gmail.com" className="footer-link">Contact</a>
            </div>
          </div>
          <div className="footer__col">
            <div className="footer__heading">Elsewhere</div>
            <div className="footer__socials">
              <a href="https://www.tiktok.com/@forgutti" target="_blank" rel="noopener noreferrer" className="footer-social">
                TikTok <span aria-hidden="true">↗</span>
              </a>
              <a href="https://github.com/ereyomi" target="_blank" rel="noopener noreferrer" className="footer-social">
                GitHub <span aria-hidden="true">↗</span>
              </a>
              <a href="https://www.linkedin.com/in/ereyomi" target="_blank" rel="noopener noreferrer" className="footer-social">
                LinkedIn <span aria-hidden="true">↗</span>
              </a>
              <GatedLink
                href={COMMUNITY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social"
                gate={{
                  source: "community",
                  label: "footer",
                  title: "Join the community",
                  body: "Leave your email to get the Telegram invite — plus occasional notes on what I'm shipping.",
                  cta: "Get the invite ↗",
                  done: "Your email is saved — the Telegram invite is opening now.",
                }}
              >
                Join my community <span aria-hidden="true">↗</span>
              </GatedLink>
            </div>
          </div>
          <div className="footer__col">
            <div className="footer__heading">Legal</div>
            <div className="footer__links">
              <Link href="/terms" className="footer-link">Terms of Service</Link>
              <Link href="/privacy" className="footer-link">Privacy Policy</Link>
              <Link href="/refund-policy" className="footer-link">Refund Policy</Link>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© 2026 Forgutti. Built with AI.</span>
          <a href={isHome ? "#top" : "/#top"} className="footer__toplink">Back to top ↑</a>
        </div>
        <div className="footer__legal-entity">
          Forgutti Unipessoal Lda (NIF 519031075), Rua Comissão de Iniciativa n.º 2-A, 2.º andar,
          porta 212, Torre Brasil, 2410-098 Leiria (Pousos, Barreira e Cortes), Portugal
        </div>
      </div>
    </footer>
  );
}
