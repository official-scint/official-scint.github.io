export function initBackToTop() {
  const button = document.querySelector<HTMLElement>("[data-to-top]");
  if (!button) return;

  let ticking = false;
  const sync = () => {
    if (window.scrollY > window.innerHeight * 0.6) button.setAttribute("data-show", "");
    else button.removeAttribute("data-show");
    ticking = false;
  };

  addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(sync);
    },
    { passive: true }
  );
  sync();

  button.addEventListener("click", () => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  });
}
