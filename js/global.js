const templates = document.querySelectorAll("template");
const pathParts = location.pathname.split("/").filter(Boolean);
const depth = location.pathname.endsWith("/")
  ? pathParts.length
  : Math.max(pathParts.length - 1, 0);

const fetchComponents = [...templates].map(async (template) => {
  const templateID = template.id;
  const response = await fetch(
    `${"../".repeat(depth)}/components/${templateID}.html`
  );
  if (!response.ok) {
    throw new Error(`Failed to load component: ${templateID}`);
  }
  const component = await response.text();
  template.outerHTML = component;
});

// load all components, then run onMounted callback
Promise.all(fetchComponents).then(() => {
  if (typeof onMounted === "function") {
    onMounted();
  }
});

// title animation
for (const element of document.querySelectorAll(".title")) {
  new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        element.style.setProperty("--width", "100%");
        observer.disconnect();
      }
    });
  }).observe(element);
}
