// click down arrow to scroll
const downArrow = document.querySelector('.down-arrow');
const container = document.querySelector('.container');
downArrow.addEventListener('click', () => {
    container.scrollIntoView({ behavior: 'smooth' });
});

// dynamic content
fetch("config.json").then(response => response.json()).then(config => {
    // about us
    for (let i = 0; i < config["about-us"].length; i++) {
        document.querySelector(".about-us").children[i].querySelector("p").innerHTML = config["about-us"][i];
    }
    // clubs
    const clubGroupElement = document.querySelector(".club-avatars");
    for (const {name, school, image, socials} of config["clubs"]) {
        const clubCardElement = document.createElement("div");
        clubCardElement.classList.add("club-small-card");
        clubCardElement.dataset.name = school + name;
        clubCardElement.innerHTML = `<img class="club-avatar" src="${image}">`;
        clubGroupElement.appendChild(clubCardElement);
    }
    // sponsors
    const sponsorGroupElement = document.querySelector(".sponsors");
    for (const {image, url} of config["sponsors"]) {
        const sponsorCardElement = document.createElement("a");
        sponsorCardElement.classList.add("sponsor-card");
        sponsorCardElement.href = url;
        sponsorCardElement.innerHTML = `<img src="${image}">`;
        sponsorGroupElement.appendChild(sponsorCardElement);
    }

    function clubCardsSlider() {
        let currentIndex = 3;
        let offset = 3;
        let sliderSize = config["clubs"].length;
        function render() {
            const indexMod = currentIndex % sliderSize;
            // fade in
            document.querySelector(".clubs-row").animate([
                {opacity: 0, transform: 'translateX(-50px)'},
                {opacity: 1, transform: 'translateX(0px)'}
            ], {
                duration: 500,
                easing: 'ease-in-out',
                fill: 'forwards'
            });
            // waiting for fade out
            setTimeout(() => {
                document.querySelector(".clubs-row").animate([
                    {opacity: 1, transform: 'translateX(0px)'},
                    {opacity: 0, transform: 'translateX(50px)'}
                ], {
                    duration: 500,
                    easing: 'ease-in-out',
                    fill: 'forwards'
                });
                setTimeout(() => {
                    for (let i = indexMod, j = 0; i < indexMod + offset; i++, j++) {
                        const {name, school, image, socials} = config["clubs"][(indexMod + j) % sliderSize];
                        const clubCardElement = document.querySelector(".clubs-row").children[i - indexMod];
                        clubCardElement.querySelector(".club-name").innerHTML = name;
                        clubCardElement.querySelector(".club-school").innerHTML = school;
                        clubCardElement.querySelector(".club-image").src = image;
                        for (let j = 0; j < socials.length; j++) {
                            const social = socials[j];
                            const socialName = social["name"];
                            const socialLink = social["url"];
                            const socialElement = clubCardElement.querySelector({
                                "facebook": ".fa-facebook",
                                "instagram": ".fa-instagram",
                                "website": ".fa-globe",
                                "discord": ".fa-discord",
                            } [socialName]);
                            socialElement.parentElement.classList.remove("hidden");
                            socialElement.parentElement.href = socialLink;
                        }
                    }
                }, 500);
            }, 4000);
        }
        render();
        return {
            next: () => {
                currentIndex += offset;
                render();
            },
            prev: () => {
                currentIndex -= offset;
                render();
            },
            init: () => {
                for (let i = 0; i < 3; i++) {
                    const {name, school, image, socials} = config["clubs"][i];
                    const clubCardElement = document.querySelector(".clubs-row").children[i];
                    clubCardElement.querySelector(".club-name").innerHTML = name;
                    clubCardElement.querySelector(".club-school").innerHTML = school;
                    clubCardElement.querySelector(".club-image").src = image;
                    for (let j = 0; j < socials.length; j++) {
                        const social = socials[j];
                        const socialName = social["name"];
                        const socialLink = social["url"];
                        const socialElement = clubCardElement.querySelector({
                            "facebook": ".fa-facebook",
                            "instagram": ".fa-instagram",
                            "website": ".fa-globe",
                            "discord": ".fa-discord",
                        } [socialName]);
                        socialElement.parentElement.classList.remove("hidden");
                        socialElement.parentElement.href = socialLink;
                    }
                }
            }
        }
    }

    const clubSlider = clubCardsSlider();
    clubSlider.init();
    setInterval(() => {
        clubSlider.next();        
    }, 5000);
});

// fade up animation
for (const element of document.querySelectorAll('.fade-up')) {
    new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                element.animate([
                    {opacity: 0, transform: 'translateY(50px)'},
                    {opacity: 1, transform: 'translateY(0px)'}
                ], {
                    duration: 500,
                    easing: 'ease-in-out',
                    fill: 'forwards'
                });
                observer.disconnect();
            }
        });
    }).observe(element);
}

const events_container = document.querySelector('.events-container');

function htmlStringToElement(html) {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

// load events
fetch("https://api.scint.org/events")
    .then(response => response.json())
    .then(events => {
        for (const event of events) {
            const description = event.description;
            const start_time = new Date(event.scheduled_start_time);
            const image_url = `https://cdn.discordapp.com/guild-events/${event.id}/${event.image}?size=2048`;
            const title = event.name;
            const add_to_calendar_url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${title.replace("#", "")}&dates=${start_time.toISOString().replace(/[-:]/g, "").replace(/\.\d\d\d/g, "")}/${start_time.toISOString().replace(/[-:]/g, "").replace(/\.\d\d\d/g, "")}&details=${description.replace("#", "")}&sf=true&output=xml`;
            const event_card = htmlStringToElement(`
            <div class="event-card">
                <div class="event-card-left">
                    <div class="event-details">
                        <h2 class="event-title">${title}</h2>
                        <pre class="event-description">${description}</pre>
                    </div>
                    <div class="event-buttons">
                        <a target="_blank" href="${add_to_calendar_url}" class="event-button">添加行事曆</a>
                    </div>
                </div>
                <div class="event-card-right">
                    <img class="event-image"
                        src="${image_url}" />
                </div>
            </div>
            `);
            events_container.appendChild(event_card);
        }
    });

// fake logo
const fakeLogoWidth = 447;
const fakeLogoHeight = 78;
const fakeLogo = document.querySelector('.banner-image-fake');
