export function initBandFlash() {
  const bands = document.querySelectorAll<HTMLElement>(".band");
  if (!bands.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const band = entry.target;
        band.classList.add("flash");
        band.addEventListener("animationend", () => band.classList.remove("flash"), { once: true });
        io.unobserve(band);
      }
    },
    { threshold: 0.1 }
  );

  bands.forEach((band) => io.observe(band));
}
