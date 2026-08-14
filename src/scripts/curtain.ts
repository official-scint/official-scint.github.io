const REVEAL_DELAY = 900;

export function initCurtain(reduced: boolean) {
  const curtain = document.querySelector<HTMLElement>("[data-entry]");
  if (!curtain) return;

  if (reduced) {
    curtain.remove();
    return;
  }

  setTimeout(() => {
    curtain.setAttribute("data-reveal", "");
    curtain.addEventListener("animationend", () => curtain.remove(), { once: true });
  }, REVEAL_DELAY);
}
