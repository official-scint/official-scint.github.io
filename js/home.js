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
    // top clubs
    const clubGroupElement = document.querySelector(".club-avatars");
    const clubs = config["clubs"];
    for (const club of clubs) {
        const {name, school, image, socials} = club;
        const clubCardElement = document.createElement("div");
        clubCardElement.classList.add("club-small-card");
        clubCardElement.dataset.name = school + name;
        clubCardElement.innerHTML = `<img class="club-avatar" src="${image}">`;
        clubGroupElement.appendChild(clubCardElement);
    }
    // for (let i = 0; i < config["clubs"]["top"].length; i++) {
    //     const {name, school, image, socials} = config["clubs"]["top"][i];
    //     const clubCardElement = document.querySelector(".clubs-row").children[i];
    //     clubCardElement.querySelector(".club-name").innerHTML = name;
    //     clubCardElement.querySelector(".club-school").innerHTML = school;
    //     clubCardElement.querySelector(".club-image").src = image;
    //     for (let j = 0; j < socials.length; j++) {
    //         const social = socials[j];
    //         const socialName = social["name"];
    //         const socialLink = social["url"];
    //         const socialElement = clubCardElement.querySelector({
    //             "facebook": ".fa-facebook",
    //             "instagram": ".fa-instagram",
    //             "website": ".fa-globe",
    //             "discord": ".fa-discord",
    //         } [socialName]);
    //         socialElement.parentElement.classList.remove("hidden");
    //         socialElement.parentElement.href = socialLink;
    //     }
    // }
    // other clubs
    // const clubGroupElement = document.querySelector(".club-avatars");
    // for (let i = 0; i < config["clubs"]["other"].length; i++) {
    //     const {name, image} = config["clubs"]["other"][i];
    //     const clubCardElement = document.createElement("div");
    //     clubCardElement.classList.add("club-small-card");
    //     clubCardElement.dataset.name = name;
    //     clubCardElement.innerHTML = `<img class="club-avatar" src="${image}">`;
    //     clubGroupElement.appendChild(clubCardElement);
    // }
    // history
    for (let i = 0; i < config["history"].length; i++) {
        const {title, content, image} = config["history"][i];
        const historyCardElement = document.querySelector(".timeline").children[i];
        historyCardElement.querySelector("h2").innerHTML = title;
        historyCardElement.querySelector("p").innerHTML = content;
        historyCardElement.querySelector("img").src = image;
    }
    // sponsors
    const sponsorGroupElement = document.querySelector(".sponsors");
    for (let i = 0; i < config["sponsors"].length; i++) {
        const {image, url} = config["sponsors"][i];
        const sponsorCardElement = document.createElement("a");
        sponsorCardElement.classList.add("sponsor-card");
        sponsorCardElement.href = url;
        sponsorCardElement.innerHTML = `<img src="${image}">`;
        sponsorGroupElement.appendChild(sponsorCardElement);
    }
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

// fake logo
const fakeLogoWidth = 447;
const fakeLogoHeight = 78;
const fakeLogo = document.querySelector('.banner-image-fake');