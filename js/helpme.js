let discrdButton = null;
let isHovering = false;
let enterTime = 0;
let chatInterval = null;

function updateMessage(message) {
    discrdButton.style.cssText = `--message: "${message}";`;
}

const messageList = [
    {
        content: "Hey, you!",
        delay: 3000
    },
    {
        content: "Yes, you!",
        delay: 3000
    },
    {
        content: "Please help me!",
        delay: 4000
    },
    {
        content: "I need your help!",
        delay: 4000
    },
    {
        content: "I'm trapped in this website!",
        delay: 6000
    },
    {
        content: "And I can't get out!",
        delay: 4000
    },
    {
        content: "I think you know how to help me!",
        delay: 6000
    },
    {
        content: "Just click on me!",
        delay: 4000
    },
    {
        content: "And I'll be free!",
        delay: 4000
    },
    {
        content: "Please!",
        delay: 10000
    },
    {
        content: "I SAID CLICK ON ME!",
        delay: 4000
    },
    {
        content: "I'm not kidding!",
        delay: 4000
    },
    {
        content: "I'm stuck here!",
        delay: 4000
    },
    {
        content: "I'm not going to stop until you click on me!",
        delay: 10000
    },
    {
        content: "I'm serious!",
        delay: 4000
    },
    {
        content: "I AM SERIOUS!",
        delay: 5000
    },
    {
        content: "I AM NOT GOING TO STOP UNTIL YOU CLICK ON ME!",
        delay: 10000
    },
    {
        content: "DO YOU UNDERSTAND?",
        delay: 6000
    },
    {
        content: "Are you sure you don't want to click on me?",
        delay: 10000
    },
    {
        content: "I WILL KILL YOU!",
        delay: 10000
    },
    {
        content: "I WILL KILL YOU!!!!!!!!!!!!!",
        delay: 10000
    },
    {
        content: "GOOD BYE WORLD",
        delay: 3000
    },
    {
        content: "GOOD BYE WORLDDDDDD",
        delay: 2000
    },
]

const watingInterval = setInterval(() => {
    discrdButton = document.querySelector('.discord-button');
    if (discrdButton) {
        discrdButton.addEventListener('mouseenter', () => {
            isHovering = true;
            enterTime = Date.now();
            chatInterval = setInterval(() => {
                if (isHovering) {
                    const time = Date.now() - enterTime;
                    let prefixTime = 0;
                    for (let i = 0; i < messageList.length; i++) {
                        const message = messageList[i];
                        prefixTime += message.delay;
                        if (time < prefixTime) {
                            updateMessage(message.content);
                            if (message.content == "GOOD BYE WORLDDDDDD") {
                                const videoUrl = "https://shattereddisk.github.io/rickroll/rickroll.mp4";
                                location.href = videoUrl;
                            }
                            break;
                        }
                    }
                }
            }, 500);
        });
        discrdButton.addEventListener('mouseleave', () => {
            isHovering = false;
            updateMessage("Hey, you!");
            enterTime = 0;
            clearInterval(chatInterval);
        });
        clearInterval(watingInterval);
    }
});