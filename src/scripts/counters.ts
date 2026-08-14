export function renderCountsInstantly() {
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    el.textContent = el.dataset.count ?? "0";
  });
}
