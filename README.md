# Forgutti — AI Agency Site

A single-page marketing site for **Forgutti** (AI systems, education & content).
Implemented as a framework-free static site, ported 1:1 from the Claude Design
prototype in [`design/Forgutti.dc.html`](design/Forgutti.dc.html).

## Stack

Plain HTML + CSS + vanilla JS — no build step, no dependencies. Fonts load from
Google Fonts (Space Grotesk + JetBrains Mono).

```
index.html      Markup for every section
styles.css      Design tokens + all component styles
script.js       Behavior: nav blur-on-scroll, scroll-progress bar,
                reveal-on-scroll, and the hero node-network canvas
design/         Original Claude Design handoff bundle (reference only)
```

## Run it

No tooling required — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Sections

Hero · Services · Stack · Products · About · Writing · Contact · Footer —
all reveal on scroll, with a live particle-network canvas behind the hero.

## Theming

The design's "Tweaks" are baked in as tokens/constants:

- **Accent** — `--accent` in `styles.css` (`:root`). Default `#4F8EF7`;
  the design also ships `#3DFFD0` (teal) and `#8B7CF7` (purple). Changing this
  one variable re-themes the whole site, including the hero canvas.
- **Ambient / node density** — `AMBIENT` and `NODE_DENSITY` at the top of
  `script.js` (`'nodes'` | `'grid'` | `'off'`, and `18`–`90`).

## Accessibility & motion

Respects `prefers-reduced-motion`: the canvas renders a static frame and all
reveal/pulse animations are disabled. Interactive elements have visible
`:focus-visible` outlines. Reveal states are applied via JS, so content stays
visible if JavaScript is unavailable.

## Notes

Content (copy, links, tech stack, social handles) is transcribed from the latest
design source. The PNGs in `design/screenshots/` are earlier reference captures
and may differ slightly from the current copy — `design/Forgutti.dc.html` is the
source of truth.
