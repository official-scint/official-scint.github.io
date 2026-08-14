
import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";

const M = Matter;
const WALL = 400;

function makeWalls(width, height, world) {
  M.Composite.add(world, [
    M.Bodies.rectangle(width / 2, -WALL / 2, width + 2 * WALL, WALL, {
      isStatic: true,
    }),
    M.Bodies.rectangle(width / 2, height + WALL / 2, width + 2 * WALL, WALL, {
      isStatic: true,
    }),
    M.Bodies.rectangle(-WALL / 2, height / 2, WALL, height + 2 * WALL, {
      isStatic: true,
    }),
    M.Bodies.rectangle(width + WALL / 2, height / 2, WALL, height + 2 * WALL, {
      isStatic: true,
    }),
  ]);
}

export default function ClubGravity({
  items = [],
  minSize = 58,
  maxSize = 118,
  resetLabel = "再丟一次",
}) {
  const containerRef = useRef(null);
  const rafRef = useRef(0);
  const [size, setSize] = useState(64);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [ready, setReady] = useState(false);
  const [nudge, setNudge] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const measure = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      const target = Math.sqrt((w * h * 0.6) / Math.max(1, items.length));
      setSize(Math.round(Math.max(minSize, Math.min(maxSize, target))));
      setDims((prev) => (prev.w === w && prev.h === h ? prev : { w, h }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    return () => ro.disconnect();
  }, [items.length, minSize, maxSize]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const io = new IntersectionObserver(
      ([entry]) => setReady(entry.isIntersecting),
      { threshold: 0, rootMargin: "200px" }
    );
    io.observe(container);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !ready || !items.length) return;

    const width = dims.w || container.clientWidth;
    const height = dims.h || container.clientHeight;

    if (width < 2 || height < 2) {
      const retry = setTimeout(
        () => setDims({ w: container.clientWidth, h: container.clientHeight }),
        150
      );
      return () => clearTimeout(retry);
    }

    const engine = M.Engine.create({
      enableSleeping: false,
      gravity: { x: 0, y: 1.05 },
    });
    makeWalls(width, height, engine.world);

    const mouse = M.Mouse.create(container);
    const mouseConstraint = M.MouseConstraint.create(engine, {
      mouse,
      constraint: { angularStiffness: 0, stiffness: 0.16, damping: 0 },
    });
    M.Composite.add(engine.world, mouseConstraint);
    mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
    mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
    const onLeave = () => mouseConstraint.mouse.mouseup(new Event("mouseup"));
    container.addEventListener("mouseleave", onLeave);

    const bodies = items.map((_, i) => {
      const perRow = Math.max(1, Math.floor(width / (size + 8)));
      const col = i % perRow;
      const row = Math.floor(i / perRow);
      return M.Bodies.rectangle(
        ((col + 0.5) / perRow) * width + (Math.random() - 0.5) * 12,
        -size - row * (size + 90),
        size,
        size,
        { friction: 0.06, frictionAir: 0.004, restitution: 0.72, chamfer: { radius: 0 } }
      );
    });
    M.Composite.add(engine.world, bodies);

    bodies.forEach((body) => {
      M.Body.setVelocity(body, { x: (Math.random() - 0.5) * 14, y: 0 });
      M.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.4);
    });

    const els = Array.from(container.querySelectorAll("[data-body]"));

    const kick = (event) => {
      const rect = container.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      for (const body of bodies) {
        const dx = body.position.x - x;
        const dy = body.position.y - y;
        if (Math.abs(dx) > size || Math.abs(dy) > size) continue;
        M.Body.applyForce(body, body.position, {
          x: dx * 0.00035,
          y: -0.055 - Math.random() * 0.03,
        });
        M.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.6);
      }
    };
    container.addEventListener("click", kick);

    const noSelect = (event) => event.preventDefault();
    container.addEventListener("mousedown", noSelect);
    container.addEventListener("selectstart", noSelect);

    let started = false;
    const fallback = setTimeout(() => {
      if (started) return;
      container.dataset.fallback = "true";
      els.forEach((el) => {
        el.style.visibility = "visible";
        el.style.transform = "none";
      });
    }, 1000);

    const update = () => {
      rafRef.current = requestAnimationFrame(update);
      M.Engine.update(engine, 1000 / 60);

      const half = size / 2;
      for (const body of bodies) {
        const { x, y } = body.position;
        if (x >= half && x <= width - half && y <= height + size) continue;
        M.Body.setPosition(body, {
          x: Math.min(Math.max(x, half), width - half),
          y: Math.min(y, height - half),
        });
        M.Body.setVelocity(body, { x: 0, y: 0 });
      }
      for (let i = 0; i < bodies.length; i++) {
        const el = els[i];
        if (!el) continue;
        const { position, angle } = bodies[i];
        started = true;
        el.style.visibility = "visible";
        el.style.transform = `translate(${position.x}px, ${position.y}px) translate(-50%, -50%) rotate(${angle}rad)`;
      }
    };
    update();

    return () => {
      clearTimeout(fallback);
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener("mouseleave", onLeave);
      container.removeEventListener("click", kick);
      container.removeEventListener("mousedown", noSelect);
      container.removeEventListener("selectstart", noSelect);
      M.World.clear(engine.world, false);
      M.Engine.clear(engine);
    };
  }, [ready, items, size, nudge, dims.w, dims.h]);

  return (
    <div className="gravity">
      <div
        ref={containerRef}
        className="gravity-stage"
        draggable={false}
        onDragStart={(e) => e.preventDefault()}
      >
        {items.map((item, i) => (
          <div
            key={`${item.label}-${i}`}
            data-body=""
            className="gravity-body"
            title={item.label}
            style={{ width: size, height: size, visibility: "hidden" }}
            draggable={false}
          >
            <img src={item.src} alt="" draggable={false} />
            <span className="gravity-tip">{item.label}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="btn btn-outline btn-sm gravity-reset"
        onClick={() => setNudge((n) => n + 1)}
      >
        {resetLabel}
      </button>
    </div>
  );
}
