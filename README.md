# Forgutti — AI Agency Site

A single-page marketing site for **Forgutti** (AI systems, education & content),
built with **Next.js** (App Router) and ported 1:1 from the original static site
(kept in [`legacy/`](legacy/) for reference).

## Stack

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- The original hand-written CSS, unchanged (`app/globals.css`) — fonts load from
  Google Fonts (Space Grotesk + JetBrains Mono)
- **PostgreSQL** (`pg`) for storing captured leads behind `POST /api/leads`

```
app/
  layout.tsx            Root layout: nav, scroll progress, reveal-on-scroll,
                        footer, and the email-gate provider
  page.tsx              Home page (assembles the sections)
  globals.css           Design tokens + all component styles (+ gate modal)
  terms/                Terms of Service
  privacy/              Privacy Policy
  refund-policy/        Refund & Cancellation Policy
  api/leads/route.ts    POST endpoint that stores captured emails
components/
  EmailGateProvider.tsx Email-capture modal + gate logic (localStorage memory)
  GatedLink.tsx         <a> that collects an email before navigating
  HeroCanvas.tsx        Ambient node-network canvas
  SiteNav / ScrollProgress / RevealController  Ports of the legacy script.js
  sections/             Hero, Services, Stack, Products, About, Writing, Contact
lib/db.ts               Postgres pool + lazy `leads` table setup
public/assets/          Product logo SVGs
legacy/                 The original static site (HTML/CSS/JS) — reference only
```

## Run it

```bash
npm install
cp .env.local.example .env.local   # then set DATABASE_URL
npm run dev                        # http://localhost:3000
```

Production:

```bash
npm run build && npm start
```

## Email capture

Visitors are asked for their email **once per browser** (remembered via a
localStorage flag) before any of these actions:

| Action | Where | `source` value |
| --- | --- | --- |
| See my work | Hero button | `hero-products` |
| Try VistoPilot free / View preview | Products section | `product` |
| Get updates | "Next in the pipeline" card | `updates` |
| Join my community | Contact section + footer | `community` |

Submissions are POSTed to `/api/leads` and stored in Postgres:

```sql
CREATE TABLE leads (
  id          BIGSERIAL PRIMARY KEY,
  email       TEXT NOT NULL,
  source      TEXT NOT NULL,   -- community | product | updates | hero-products
  label       TEXT,            -- e.g. "vistopilot"
  target      TEXT,            -- URL the visitor was heading to
  page        TEXT,            -- page they submitted from
  user_agent  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (email, source)       -- via unique index; resubmits are ignored
);
```

The table is created automatically on first insert. A honeypot field silently
discards bot submissions. If `DATABASE_URL` is not set, leads are logged to the
server console instead and the visitor is still let through (dev convenience).

### Environment

| Variable | Required | Notes |
| --- | --- | --- |
| `DATABASE_URL` | yes (prod) | Postgres connection string (Supabase/Neon/RDS/…) |
| `DATABASE_SSL` | no | set to `false` for local Postgres without SSL |

## Theming

- **Accent** — `--accent` in `app/globals.css` (`:root`). Default `#4F8EF7`;
  alternatives `#3DFFD0` (teal) and `#8B7CF7` (purple). Re-themes the whole
  site, including the hero canvas.
- **Ambient / node density** — `AMBIENT` and `NODE_DENSITY` at the top of
  `components/HeroCanvas.tsx`.

## Accessibility & motion

Respects `prefers-reduced-motion`: the canvas renders a static frame and
reveal/pulse animations are disabled. The email gate is a proper dialog
(`role="dialog"`, Escape to close, backdrop click to close, autofocus).
Interactive elements have visible `:focus-visible` outlines.

## Notes

The legal pages are **drafts** with bracketed placeholders (e.g. `[DATA
RETENTION]`) — have them reviewed by a lawyer before relying on them. The
privacy policy has been updated to describe the new email capture and the
localStorage flag.
