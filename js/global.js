const templates = document.querySelectorAll('template');
const depth = location.href.replace("//", "").split('/').length - 2;

// load components
templates.forEach(template => {
    const templateID = template.id;
    fetch(`${"../".repeat(depth)}/components/${templateID}.html`)
        .then(response => response.text())
        .then(html => {
            template.outerHTML = html;
        });
});

// title animation
for (const element of document.querySelectorAll('.title')) {
    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                element.style.setProperty('--width', '100%');
                observer.disconnect();
            }
        });
    }).observe(element);
}