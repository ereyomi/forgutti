import { NextResponse } from "next/server";
import { getPool, insertLead } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_SOURCES = new Set(["community", "product", "updates", "hero-products"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const v = value.trim().slice(0, max);
  return v.length > 0 ? v : null;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const email = clean(body.email, 254)?.toLowerCase() ?? "";
  const source = clean(body.source, 40) ?? "";

  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!ALLOWED_SOURCES.has(source)) {
    return NextResponse.json({ ok: false, error: "Unknown signup source." }, { status: 400 });
  }

  // Honeypot: bots fill the hidden "company" field. Pretend success, store nothing.
  if (clean(body.company, 100)) {
    return NextResponse.json({ ok: true, stored: true });
  }

  const lead = {
    email,
    source,
    label: clean(body.label, 80),
    target: clean(body.target, 500),
    page: clean(body.page, 200),
    userAgent: (req.headers.get("user-agent") ?? "").slice(0, 300) || null,
  };

  const pool = getPool();
  if (!pool) {
    // No database configured yet (e.g. local dev) — log the lead so nothing is
    // lost, and let the visitor through.
    console.warn("[leads] DATABASE_URL not set — logging lead instead:", lead);
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const result = await insertLead(lead);
    return NextResponse.json({ ok: true, stored: true, result });
  } catch (err) {
    console.error("[leads] insert failed:", err);
    // Log the lead so a database outage doesn't lose signups silently.
    console.error("[leads] lead that failed to store:", lead);
    return NextResponse.json(
      { ok: false, error: "Something went wrong saving your email. Please try again." },
      { status: 500 }
    );
  }
}
