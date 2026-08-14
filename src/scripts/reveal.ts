export function initReveal() {
  const targets = document.querySelectorAll(".rise");
  if (!targets.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.15, rootMargin: "0px 0px -6% 0px" }
  );

  targets.forEach((el) => io.observe(el));
}
