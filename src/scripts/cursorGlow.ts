const RADIUS = 180;
const EASING = 0.12;

export function initCursorGlow() {
  const glow = document.querySelector<HTMLElement>("[data-cursor-glow]");
  if (!glow) return;

  let x = -999;
  let y = -999;
  let targetX = -999;
  let targetY = -999;
  let active = false;

  const tick = () => {
    x += (targetX - x) * EASING;
    y += (targetY - y) * EASING;
    glow.style.transform = `translate(${x - RADIUS}px, ${y - RADIUS}px)`;
    requestAnimationFrame(tick);
  };

  document.addEventListener(
    "pointermove",
    (event) => {
      targetX = event.clientX;
      targetY = event.clientY;
      if (active) return;
      active = true;
      glow.setAttribute("data-active", "");
      x = targetX;
      y = targetY;
      tick();
    },
    { passive: true }
  );

  document.addEventListener("pointerleave", () => {
    active = false;
    glow.removeAttribute("data-active");
  });
}
