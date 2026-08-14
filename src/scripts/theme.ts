const STORAGE_KEY = "scint-theme";
const WIPE_MS = 500;
const WIPE_FALLBACK_MS = 700;

const store = (theme: string) => {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {}
};

function wipe(button: HTMLElement, next: string, done: () => void) {
  const rect = button.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  const radius = Math.hypot(
    Math.max(cx, window.innerWidth - cx),
    Math.max(cy, window.innerHeight - cy)
  );

  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:fixed;inset:0;z-index:9998;pointer-events:none;
    background:${next === "dark" ? "#050711" : "#ffffff"};
    clip-path:circle(0px at ${cx}px ${cy}px);
    transition:clip-path ${WIPE_MS}ms cubic-bezier(0.4,0,0,1);
  `;
  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    overlay.style.clipPath = `circle(${radius}px at ${cx}px ${cy}px)`;
  });

  const finish = () => {
    overlay.remove();
    done();
  };

  overlay.addEventListener("transitionend", finish, { once: true });
  setTimeout(finish, WIPE_FALLBACK_MS);
}

export function initThemeToggle(reduced: boolean) {
  const root = document.documentElement;
  let busy = false;

  document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
    button.addEventListener("click", () => {
      if (busy) return;
      const next = root.dataset.theme === "dark" ? "light" : "dark";

      if (reduced || !(button instanceof HTMLElement)) {
        root.dataset.theme = next;
        store(next);
        return;
      }

      busy = true;
      wipe(button, next, () => {
        root.dataset.theme = next;
        store(next);
        busy = false;
      });
    });
  });
}
