const START_DELAY = 900;
const CHAR_DELAY = 55;
const BREAK_DELAY = 200;

export function initTypewriter(selector = "[data-type]") {
  const target = document.querySelector<HTMLElement>(selector);
  if (!target) return;

  const chars: (HTMLElement | null)[] = [];
  const cursor = document.createElement("span");
  cursor.className = "ty-cursor";
  cursor.setAttribute("aria-hidden", "true");

  const split = (node: ChildNode) => {
    if (node.nodeType === Node.TEXT_NODE && node.textContent) {
      const frag = document.createDocumentFragment();
      for (const char of node.textContent) {
        const span = document.createElement("span");
        span.className = "ty";
        span.textContent = char;
        frag.appendChild(span);
        chars.push(span);
      }
      (node as Text).replaceWith(frag);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    if ((node as Element).tagName === "BR") {
      chars.push(null);
      return;
    }
    Array.from(node.childNodes).forEach(split);
  };

  split(target);
  target.appendChild(cursor);

  let i = 0;
  const next = () => {
    if (i === 0) target.classList.add("typing");
    if (i >= chars.length) {
      setTimeout(() => cursor.remove(), 1500);
      return;
    }
    const char = chars[i++];
    if (char === null) {
      setTimeout(next, BREAK_DELAY);
      return;
    }
    char.classList.add("on");
    setTimeout(next, CHAR_DELAY + Math.random() * 30);
  };

  setTimeout(next, START_DELAY);
}
