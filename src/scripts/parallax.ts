export function initParallax() {
  const ghosts = document.querySelectorAll<HTMLElement>(".ghost-parallax");
  if (!ghosts.length) return;

  let ticking = false;
  const paint = () => {
    ghosts.forEach((ghost) => {
      const rect = ghost.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      ghost.style.transform = `translateY(${(center - window.innerHeight / 2) * 0.06}px)`;
    });
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
