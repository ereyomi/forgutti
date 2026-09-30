"use client";

/* Ambient node-network canvas behind the hero (port of initCanvas in script.js). */

import { useEffect, useRef } from "react";

const AMBIENT: "nodes" | "grid" | "off" = "nodes";
const NODE_DENSITY = 48; // 18–90

function accentHex(): string {
  let v = getComputedStyle(document.documentElement).getPropertyValue("--accent");
  v = (v || "").trim();
  return v || "#4F8EF7";
}

function hexToRgb(hex: string): [number, number, number] {
  let h = (hex || "#4F8EF7").replace("#", "");
  if (h.length === 3)
    h = h
      .split("")
      .map((c) => c + c)
      .join("");
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!maybeCtx) return;
    const ctx: CanvasRenderingContext2D = maybeCtx;

    const reduced = !!(
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

    const [r, g, b] = hexToRgb(accentHex());
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 1;
    let h = 1;
    let rafId = 0;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    if (AMBIENT === "off") {
      ctx.clearRect(0, 0, w, h);
      return () => window.removeEventListener("resize", resize);
    }

    if (AMBIENT === "grid") {
      const drawGrid = () => {
        ctx.clearRect(0, 0, w, h);
        ctx.lineWidth = 1;
        ctx.strokeStyle = `rgba(${r},${g},${b},0.06)`;
        const gap = Math.max(46, Math.min(86, w / 16));
        for (let x = 0; x <= w; x += gap) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, h);
          ctx.stroke();
        }
        for (let y = 0; y <= h; y += gap) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y);
          ctx.stroke();
        }
      };
      drawGrid();
      window.addEventListener("resize", drawGrid);
      return () => {
        window.removeEventListener("resize", resize);
        window.removeEventListener("resize", drawGrid);
      };
    }

    // nodes
    const density = Math.max(18, Math.min(90, NODE_DENSITY));
    const count = Math.round(Math.min(density, Math.max(16, (w * h) / 24000)));
    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
      });
    }
    const D = Math.max(110, Math.min(200, Math.sqrt(w * w + h * h) / 9));

    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const bn = nodes[j];
          const dx = a.x - bn.x;
          const dy = a.y - bn.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < D) {
            const al = (1 - dist / D) * 0.2;
            ctx.strokeStyle = `rgba(${r},${g},${b},${al})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(bn.x, bn.y);
            ctx.stroke();
          }
        }
      }
      ctx.fillStyle = `rgba(${r},${g},${b},0.5)`;
      for (let k = 0; k < nodes.length; k++) {
        const p = nodes[k];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    draw();

    if (reduced) {
      return () => {
        window.removeEventListener("resize", resize);
        cancelAnimationFrame(rafId);
      };
    }

    function step() {
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        a.x += a.vx;
        a.y += a.vy;
        if (a.x < -24) a.x = w + 24;
        if (a.x > w + 24) a.x = -24;
        if (a.y < -24) a.y = h + 24;
        if (a.y > h + 24) a.y = -24;
      }
      draw();
      rafId = requestAnimationFrame(step);
    }
    rafId = requestAnimationFrame(step);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <canvas className="hero__canvas" id="hero-canvas" aria-hidden="true" ref={canvasRef} />;
}
