
import { useEffect, useRef, useState } from "react";

const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

function readInk() {
  if (typeof window === "undefined") return "#131824";
  const v = getComputedStyle(document.documentElement).getPropertyValue("--fg");
  return v.trim() || "#131824";
}

export default function ReactiveGrid({
  shape = "square",
  maxSize = 15,
  minSize = 2,
  gap = 9,
  influence = 190,
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const mouseRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const currentRef = useRef(new Float32Array(0));
  const [ink, setInk] = useState("#16161a");

  useEffect(() => {
    setInk(readInk());
    const mo = new MutationObserver(() => setInk(readInk()));
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => mo.disconnect();
  }, []);

  const inkRef = useRef(ink);
  useEffect(() => {
    inkRef.current = ink;
  }, [ink]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const syncSize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const s = sizeRef.current;
      if (s.w === w && s.h === h && s.dpr === dpr) return;
      sizeRef.current = { w, h, dpr };
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const buildPath = (cx, cy, s) => {
      const half = s / 2;
      ctx.beginPath();
      if (shape === "circle") ctx.arc(cx, cy, half, 0, Math.PI * 2);
      else if (shape === "diamond") {
        ctx.moveTo(cx, cy - half);
        ctx.lineTo(cx + half, cy);
        ctx.lineTo(cx, cy + half);
        ctx.lineTo(cx - half, cy);
        ctx.closePath();
      } else ctx.rect(cx - half, cy - half, s, s);
    };

    const draw = () => {
      syncSize();
      const { w, h } = sizeRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, w, h);

      const cell = Math.max(1, maxSize + gap);
      const cols = Math.max(1, Math.floor(w / cell));
      const rows = Math.max(1, Math.floor(h / cell));
      const offX = (w - cols * cell) / 2 + cell / 2;
      const offY = (h - rows * cell) / 2 + cell / 2;
      const count = cols * rows;
      if (currentRef.current.length !== count) {
        currentRef.current = new Float32Array(count).fill(minSize);
      }
      const sizes = currentRef.current;

      ctx.fillStyle = inkRef.current;
      const radius = Math.max(1, influence);

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const idx = j * cols + i;
          const cx = offX + i * cell;
          const cy = offY + j * cell;
          let infl = 0;
          if (mouse) {
            const dx = mouse.x - cx;
            const dy = mouse.y - cy;
            infl = clamp(1 - Math.sqrt(dx * dx + dy * dy) / radius, 0, 1);
          }
          const target = lerp(minSize, maxSize, infl);
          const cur = lerp(sizes[idx] || minSize, target, 0.2);
          sizes[idx] = cur;
          if (cur <= 0.2) continue;
          buildPath(cx, cy, cur);
          ctx.fill();
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    syncSize();
    const ro = new ResizeObserver(syncSize);
    ro.observe(container);
    window.addEventListener("pointermove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [shape, maxSize, minSize, gap, influence]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}
    >
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
