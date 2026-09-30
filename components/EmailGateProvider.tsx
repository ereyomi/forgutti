"use client";

/* ==========================================================================
   EmailGateProvider — email capture modal shown before gated actions
   (join community, view products, get updates). Once a visitor submits
   their email, a localStorage flag stops the gate from re-appearing.
   ========================================================================== */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

export type GateSource = "community" | "product" | "updates" | "hero-products";

export type GateRequest = {
  source: GateSource;
  /** Short label for what is being unlocked, e.g. "vistopilot". */
  label?: string;
  /** Where to go after capture: external URL or in-page hash. */
  href?: string;
  title: string;
  body: string;
  cta: string;
  /** Message shown after a successful capture when there is no href. */
  done?: string;
};

type EmailGateApi = {
  /** Request the gate for an action. Runs the action directly if already captured. */
  requestGate: (req: GateRequest) => void;
};

const EmailGateContext = createContext<EmailGateApi | null>(null);

const STORAGE_KEY = "forgutti:email-captured";

function isCaptured(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markCaptured(): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
  } catch {
    /* private mode etc. — gate will just show again next time */
  }
}

function runAction(req: GateRequest) {
  const href = req.href;
  if (!href || href === "#") return;
  if (href.startsWith("#")) {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        block: "start",
      });
    }
    return;
  }
  // External destination — open in a new tab, like the original links did.
  window.open(href, "_blank", "noopener,noreferrer");
}

export function useEmailGate(): EmailGateApi {
  const ctx = useContext(EmailGateContext);
  if (!ctx) throw new Error("useEmailGate must be used inside <EmailGateProvider>");
  return ctx;
}

type Status = "idle" | "submitting" | "error" | "done";

export function EmailGateProvider({ children }: { children: ReactNode }) {
  const [req, setReq] = useState<GateRequest | null>(null);
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const requestGate = useCallback((r: GateRequest) => {
    if (isCaptured()) {
      runAction(r);
      return;
    }
    setReq(r);
    setEmail("");
    setCompany("");
    setStatus("idle");
    setErrorMsg("");
  }, []);

  const close = useCallback(() => setReq(null), []);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!req || status === "submitting") return;
      const value = email.trim();
      if (!value) {
        setStatus("error");
        setErrorMsg("Please enter your email address.");
        return;
      }
      setStatus("submitting");
      setErrorMsg("");
      try {
        const res = await fetch("/api/leads", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: value,
            source: req.source,
            label: req.label ?? null,
            target: req.href && req.href !== "#" ? req.href : null,
            page: window.location.pathname,
            company, // honeypot — ignored server-side when filled
          }),
        });
        const data = (await res.json()) as { ok?: boolean; error?: string };
        if (!res.ok || !data.ok) {
          setStatus("error");
          setErrorMsg(data.error ?? "Something went wrong. Please try again.");
          return;
        }
        markCaptured();
        setStatus("done");
        runAction(req);
        if (req.href && req.href !== "#") {
          // Destination opened — close the modal shortly after.
          window.setTimeout(close, 900);
        }
      } catch {
        setStatus("error");
        setErrorMsg("Network error — please check your connection and try again.");
      }
    },
    [req, status, email, company, close]
  );

  // Escape closes the modal; autofocus the input when it opens.
  useEffect(() => {
    if (!req) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      if (status === "done") closeRef.current?.focus();
      else inputRef.current?.focus();
    }, 40);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(t);
    };
  }, [req, close, status]);

  return (
    <EmailGateContext.Provider value={{ requestGate }}>
      {children}
      {req && (
        <div
          className="gate-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className="gate-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gate-title"
            aria-describedby="gate-body"
          >
            <button
              ref={closeRef}
              type="button"
              className="gate-close"
              onClick={close}
              aria-label="Close"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
                <line x1="2" y1="2" x2="12" y2="12" />
                <line x1="12" y1="2" x2="2" y2="12" />
              </svg>
            </button>

            {status === "done" ? (
              <div className="gate-done">
                <div className="gate-done__check" aria-hidden="true">
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="4,12 9,17 18,6" />
                  </svg>
                </div>
                <h3 className="gate-title" id="gate-title">You&apos;re in.</h3>
                <p className="gate-body" id="gate-body">
                  {req.done ??
                    (req.href && req.href !== "#"
                      ? "Opening your link now — your email is saved."
                      : "Thanks! Your email is saved — watch your inbox for updates.")}
                </p>
                <button type="button" className="btn btn--ghost btn--md gate-submit" onClick={close}>
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <div className="gate-eyebrow">
                  <span className="dot dot--pulse" aria-hidden="true"></span>
                  Forgutti
                </div>
                <h3 className="gate-title" id="gate-title">
                  {req.title}
                </h3>
                <p className="gate-body" id="gate-body">
                  {req.body}
                </p>

                <label className="gate-label" htmlFor="gate-email">
                  Email address
                </label>
                <input
                  ref={inputRef}
                  id="gate-email"
                  className="gate-input"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  aria-invalid={status === "error"}
                />

                {/* Honeypot — hidden from humans, bots tend to fill it. */}
                <div className="gate-hp" aria-hidden="true">
                  <label htmlFor="gate-company">Company</label>
                  <input
                    id="gate-company"
                    type="text"
                    name="company"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                {status === "error" && errorMsg && (
                  <p className="gate-error" role="alert">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn--primary btn--md gate-submit"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Saving…" : req.cta}
                </button>

                <p className="gate-privacy">
                  No spam, ever — just what you asked for.{" "}
                  <a href="/privacy">Privacy Policy</a>
                </p>
              </form>
            )}
          </div>
        </div>
      )}
    </EmailGateContext.Provider>
  );
}
