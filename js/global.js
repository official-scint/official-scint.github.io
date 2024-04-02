const templates = document.querySelectorAll("template");
const depth = location.href.replace("//", "").split("/").length - 2;

const fetchComponents = [...templates].map(async (template) => {
    console.log(template);
    const templateID = template.id;
    const response = await fetch(
      `${"../".repeat(depth)}/components/${templateID}.html`
    );
    const component = await response.text();
    template.outerHTML = component;
});

// load all components, then run onMounted callback
Promise.all(fetchComponents).then(() => {
    onMounted();
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
