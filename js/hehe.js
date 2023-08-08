const lightningImage = document.querySelector(".banner-image-middle");
let isAnimationEnded = true;
let clickCount = 0;
const clickCountTarget = 30;

lightningImage.addEventListener("click", () => {
    if (!isAnimationEnded) return;
    clickCount++;
    isAnimationEnded = false;
    if (clickCount == clickCountTarget) {
        document.body.classList.add("magic-animation");
        document.body.animate([
            {transform: `translateX(0px) rotate(0deg) scale(1) translateY(0px)`},
            {transform: `translateX(10px) rotate(0deg) scale(1) translateY(10px)`},
            {transform: `translateX(10px) rotate(10deg) scale(1.5) translateY(0px)`},
            {transform: `translateX(-10px) rotate(10deg) scale(1) translateY(-10px)`},
            {transform: `translateX(0px) rotate(-10deg) scale(1.5) translateY(0px)`},
        ], {
            duration: 100,
            iterations: 5,
        });
        lightningImage.animate([
            {transform: `rotate(0deg) scale(1)`},
            {transform: `rotate(360deg) scale(25)`},
            {transform: `rotate(720deg) scale(50)`},
            {transform: `rotate(1080deg) scale(25)`},
            {transform: `rotate(1440deg) scale(1)`},
        ], {
            duration: 1500,
            easing: 'ease-in-out',
            fill: 'forwards'
        }).finished.then(() => {
            isAnimationEnded = true;
        });
        for (let i = 0; i < 20; i++) {
            setTimeout(summonTemmie, 100 + i * 100);
        }
        return;
    }
    lightningImage.animate([
        {transform: `rotate(0deg) scale(1)`},
        {transform: `rotate(180deg) scale(1.3)`},
        {transform: `rotate(360deg) scale(1)`},
    ], {
        duration: 400,
        easing: 'ease-in-out',
        fill: 'forwards'
    }).finished.then(() => {
        isAnimationEnded = true;
    });
});

document.body.addEventListener("click", () => {
    if (clickCount < clickCountTarget) return;
    summonTemmie();
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const summonTemmie = () => {
    const temmieSound = new Audio("./assets/wewe.wav");
    temmieSound.volume = 0.5;
    temmieSound.play();
    const temmieElement = document.createElement("img");
    temmieElement.classList.add("temmie");
    temmieElement.src = "assets/temmie.png";
    document.body.appendChild(temmieElement);
    const topOffset = getRandomInt(0, 60);
    const size = getRandomInt(20, 50);
    temmieElement.style.top = `${topOffset}vw`;
    temmieElement.style.width = `${size}%`;
    temmieElement.style.zIndex = 17;
    temmieElement.animate([
        {transform: `translateX(90vw)`},
        {transform: `translateX(-100vw)`},
    ], {
        duration: getRandomInt(1000, 2000),
        fill: 'forwards'
    }).finished.then(() => {
        temmieElement.remove();
    });
};

