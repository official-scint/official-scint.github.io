export function initScrollProgress() {
  const bar = document.querySelector<HTMLElement>("[data-progress]");
  if (!bar) return;

  let ticking = false;
  const paint = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    ticking = false;
  };

  addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(paint);
    },
    { passive: true }
  );
  paint();
}
