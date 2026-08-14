
import { useEffect, useRef, useState } from "react";

const TAU = Math.PI * 2;

function readVar(name, fallback) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name);
  return v.trim() || fallback;
}

function hexAlpha(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function planWeb(count, spokes, ringCount) {
  const weights = Array.from({ length: ringCount }, (_, r) => r + 2);
  const total = weights.reduce((a, b) => a + b, 0);
  const perRing = weights.map((w) => Math.round((w / total) * count));

  let diff = count - perRing.reduce((a, b) => a + b, 0);
  perRing[perRing.length - 1] += diff;

  const slots = [];
  perRing.forEach((n, ring) => {
    for (let i = 0; i < n; i++) {
      const spoke = Math.round((i * spokes) / Math.max(1, n) + ring * 0.5) % spokes;
      slots.push({ ring, spoke });
    }
  });
  return slots;
}

export default function Network({ items = [], centerSrc = "/assets/logo-middle.png" }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [hover, setHover] = useState(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let alive = true;
    let raf = 0;
    let introAt = null;
    let boltBox = { cx: 0, cy: 0, w: 0, h: 0 };
    let spinAt = null;
    const skipIntro = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let centerRatio = 0.5;
    let centerRatioY = 0.5;
    const pointer = { x: -9999, y: -9999, inside: false };

    let palette = {
      blue: "#5b8dff",
      sky: "#58b3f5",
      teal: "#2ad6c0",
      green: "#3fdc9c",
      gold: "#f6c445",
      line: "#1b1f36",
      edge: "rgba(255, 255, 255, 0.55)",
      dark: true,
      bg: "#000000",
    };

    const readPalette = () => {
      palette = {
        blue: readVar("--blue", palette.blue),
        sky: readVar("--sky", palette.sky),
        teal: readVar("--teal", palette.teal),
        green: readVar("--green", palette.green),
        gold: readVar("--gold", palette.gold),
        line: readVar("--line", palette.line),
        dark: document.documentElement.dataset.theme === "dark",
        edge:
          document.documentElement.dataset.theme === "dark"
            ? "rgba(255, 255, 255, 0.72)"
            : "rgba(12, 16, 36, 0.42)",
        bg: readVar("--bg", palette.bg),
      };
    };
    readPalette();

    const themeWatcher = new MutationObserver(readPalette);
    themeWatcher.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    
    const SPOKES = 12;
    const RINGS = 4;
    const slots = planWeb(items.length, SPOKES, RINGS);
    const nodes = slots.map((slot, i) => ({
      item: items[i],
      ring: slot.ring,
      spoke: slot.spoke,
      phase: Math.random() * TAU,
      img: null,
      x: 0,
      y: 0,
      r: 0,
      lift: 0,
      settle: 0,
    }));

    const ringColors = [palette.blue, palette.sky, palette.teal, palette.green];

    
    nodes.forEach((node) => {
      const img = new Image();
      img.decoding = "async";
      img.src = node.item.src;
      img.onload = () => {
        node.img = img;
      };
    });

    const centerImg = new Image();
    centerImg.decoding = "async";
    centerImg.src = centerSrc;
    let centerReady = false;
    centerImg.onload = () => {
      centerReady = true;
    };

    
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = wrap.clientWidth;
      h = wrap.clientHeight;
      const style = getComputedStyle(wrap);
      const ratioX = parseFloat(style.getPropertyValue("--net-center"));
      const ratioY = parseFloat(style.getPropertyValue("--net-center-y"));
      centerRatio = Number.isFinite(ratioX) ? ratioX : 0.5;
      centerRatioY = Number.isFinite(ratioY) ? ratioY : 0.5;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    const replay = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) introAt = null;
      },
      { threshold: 0.35 }
    );
    replay.observe(canvas);

    
    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.inside = true;
    };
    const onLeave = () => {
      pointer.inside = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };
    canvas.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerleave", onLeave, { passive: true });

    const hitTest = () => {
      for (const node of nodes) {
        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        if (dx * dx + dy * dy <= node.r * node.r * 1.35) return node;
      }
      return null;
    };

    const onClick = () => {
      const dx = pointer.x - boltBox.cx;
      const dy = pointer.y - boltBox.cy;
      if (Math.abs(dx) <= boltBox.w / 2 && Math.abs(dy) <= boltBox.h / 2) {
        spinAt = performance.now();
        window.dispatchEvent(new CustomEvent("scint:bolt"));
        return;
      }

      const node = hitTest();
      if (node?.item.href) window.open(node.item.href, "_blank", "noopener,noreferrer");
    };
    canvas.addEventListener("click", onClick);

    
    const roundedPath = (x, y, size, radius) => {
      const half = size / 2;
      ctx.beginPath();
      if (typeof ctx.roundRect === "function") {
        ctx.roundRect(x - half, y - half, size, size, radius);
      } else {
        ctx.rect(x - half, y - half, size, size);
      }
    };

    
    const easeOut = (x) => 1 - Math.pow(1 - x, 3);
    const span = (elapsed, from, to) =>
      easeOut(Math.min(1, Math.max(0, (elapsed - from) / (to - from))));

    
    const draw = (time) => {
      if (!alive) return;
      if (introAt === null) introAt = time;
      const since = skipIntro ? 99999 : time - introAt;

      ctx.clearRect(0, 0, w, h);

      const cx = w * centerRatio;
      const cy = h * centerRatioY;
      const minSide = Math.min(w, h);
      const baseR = minSide * 0.36;
      const squash = 0.88;
      const spin = time * 0.000012;
      const ringRadii = [0.42, 0.6, 0.78, 0.96].map((k) => baseR * k);
      const nodeSize = Math.max(28, Math.min(58, minSide * 0.075));
      const reach = minSide * 0.24;

      const angleOf = (spoke) => (spoke / SPOKES) * TAU + spin;
      const pointAt = (spoke, radius) => [
        cx + Math.cos(angleOf(spoke)) * radius,
        cy + Math.sin(angleOf(spoke)) * radius * squash,
      ];

      for (const node of nodes) {
        const breathe = Math.sin(time * 0.0009 + node.phase) * (minSide * 0.006);
        const [nx, ny] = pointAt(node.spoke, ringRadii[node.ring] + breathe);
        node.x = nx;
        node.y = ny;

        const dx = pointer.x - node.x;
        const dy = pointer.y - node.y;
        const pull = pointer.inside
          ? Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) / reach)
          : 0;
        node.lift += (pull - node.lift) * 0.12;
        node.settle = span(since, 2150 + node.ring * 130 + node.spoke * 35, 3200 + node.ring * 130 + node.spoke * 35);
        node.r = (nodeSize / 2) * (1 + node.lift * 0.42) * node.settle;
      }

      const liftNear = (spoke, ring) => {
        let best = 0;
        for (const node of nodes) {
          if (node.spoke !== spoke && node.ring !== ring) continue;
          if (node.lift > best) best = node.lift;
        }
        return best;
      };

      const outer = ringRadii[ringRadii.length - 1];

      
      for (let spoke = 0; spoke < SPOKES; spoke++) {
        const grow = span(since, 350 + spoke * 60, 1500 + spoke * 60);
        if (grow <= 0) continue;
        const [ex, ey] = pointAt(spoke, outer * grow);
        const lift = liftNear(spoke, -1);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(ex, ey);
        ctx.strokeStyle = palette.edge;
        ctx.globalAlpha = (palette.dark ? 0.28 : 0.34) + lift * 0.5;
        ctx.lineWidth = (palette.dark ? 1 : 1.1) + lift * 1.2;
        ctx.stroke();
      }

      
      ringRadii.forEach((radius, ring) => {
        const woven = span(since, 1250 + ring * 260, 2600 + ring * 260);
        if (woven <= 0) return;

        const lift = liftNear(-1, ring);
        const drawn = woven * SPOKES;
        ctx.beginPath();
        for (let spoke = 0; spoke < SPOKES; spoke++) {
          if (spoke >= drawn) break;
          const [sx, sy] = pointAt(spoke, radius);
          const [ex, ey] = pointAt(spoke + 1, radius);
          const [mx, my] = pointAt(spoke + 0.5, radius * 0.955);
          if (spoke === 0) ctx.moveTo(sx, sy);

          const part = Math.min(1, drawn - spoke);
          if (part >= 1) {
            ctx.quadraticCurveTo(mx, my, ex, ey);
          } else {
            const [px, py] = pointAt(spoke + part, radius);
            ctx.lineTo(px, py);
          }
        }
        if (woven >= 1) ctx.closePath();
        ctx.strokeStyle = ringColors[ring] ?? palette.blue;
        ctx.globalAlpha = (palette.dark ? 0.22 : 0.28) + lift * 0.45;
        ctx.lineWidth = (palette.dark ? 1 : 1.1) + lift * 0.9;
        ctx.stroke();
      });

      ctx.globalAlpha = 1;

      
      const beat = (Math.sin(time * 0.0016) + 1) / 2;
      const pulse = 1 + beat * 0.06;
      const spark = span(since, 0, 700);
      const boltH =
        Math.max(42, Math.min(104, minSide * 0.105)) * pulse * (0.6 + spark * 0.4);
      if (centerReady && spark > 0) {
        ctx.save();
        ctx.globalAlpha = spark;

        if (spinAt !== null) {
          const turn = Math.min(1, (time - spinAt) / 900);
          ctx.translate(cx, cy);
          ctx.rotate(easeOut(turn) * Math.PI * 2);
          ctx.translate(-cx, -cy);
          if (turn >= 1) spinAt = null;
        }

        const ratio = centerImg.width / centerImg.height || 1;
        const bw = boltH * ratio;
        const bx = cx - bw / 2;
        const by = cy - boltH / 2;

        ctx.save();
        ctx.shadowColor = palette.gold;
        for (const blur of [46, 26, 13]) {
          ctx.shadowBlur = blur * (0.85 + beat * 0.3);
          ctx.drawImage(centerImg, bx, by, bw, boltH);
        }
        ctx.restore();

        ctx.drawImage(centerImg, bx, by, bw, boltH);
        ctx.restore();

        boltBox = { cx, cy, w: bw, h: boltH };
      }

      
      for (const node of nodes) {
        if (node.settle <= 0.01) continue;
        const size = node.r * 2;

        ctx.save();
        roundedPath(node.x, node.y, size, size * 0.22);
        ctx.clip();
        if (node.img) {
          ctx.drawImage(node.img, node.x - node.r, node.y - node.r, size, size);
        } else {
          ctx.fillStyle = palette.line;
          ctx.fillRect(node.x - node.r, node.y - node.r, size, size);
        }
        ctx.fillStyle = palette.bg;
        ctx.globalAlpha = (palette.dark ? 0.1 : 0.06) * (1 - node.lift);
        ctx.fillRect(node.x - node.r, node.y - node.r, size, size);
        ctx.restore();

        ctx.globalAlpha = 1;

        roundedPath(node.x, node.y, size, size * 0.22);
        ctx.strokeStyle = node.lift > 0.35 ? palette.gold : palette.edge;
        ctx.lineWidth = node.lift > 0.35 ? 2.2 : 1.4;
        if (!palette.dark) {
          ctx.save();
          ctx.shadowColor = "rgba(12, 16, 36, 0.18)";
          ctx.shadowBlur = 10;
          ctx.shadowOffsetY = 2;
        } else {
          ctx.save();
          ctx.shadowColor = node.lift > 0.35
            ? "rgba(246, 196, 69, 0.4)"
            : hexAlpha(ringColors[node.ring] ?? palette.blue, 0.25);
          ctx.shadowBlur = node.lift > 0.35 ? 18 : 10;
        }
        ctx.stroke();
        ctx.restore();
      }

      
      const hit = pointer.inside ? hitTest() : null;
      setHover((prev) => {
        if (!hit) return prev === null ? prev : null;
        if (prev && prev.label === hit.item.label) return prev;
        return { label: hit.item.label, x: hit.x, y: hit.y };
      });
      const overBolt =
        pointer.inside &&
        Math.abs(pointer.x - boltBox.cx) <= boltBox.w / 2 &&
        Math.abs(pointer.y - boltBox.cy) <= boltBox.h / 2;
      canvas.style.cursor = overBolt || hit?.item.href ? "pointer" : "default";

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      replay.disconnect();
      themeWatcher.disconnect();
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      canvas.removeEventListener("click", onClick);
    };
  }, [items, centerSrc]);

  return (
    <div className="net" ref={wrapRef}>
      <canvas className="net-canvas" ref={canvasRef} />
      {hover && (
        <span className="net-tip" style={{ left: `${hover.x}px`, top: `${hover.y}px` }}>
          {hover.label}
        </span>
      )}
    </div>
  );
}
