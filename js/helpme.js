let discordButton = null;
let isHovering = false;
let enterTime = 0;
let chatInterval = null;

function updateMessage(message) {
    if (!discordButton) return;
    discordButton.style.setProperty("--message", JSON.stringify(message));
}

let messageList = [];

fetch('messages.json').then(response => response.json()).then(messages => {
    messageList = messages;
}).catch(() => {
    messageList = [{ content: "Hey, you!", delay: 2000 }];
});

const waitingInterval = setInterval(() => {
    discordButton = document.querySelector('.discord-button');
    if (discordButton) {
        discordButton.addEventListener('mouseenter', () => {
            isHovering = true;
            enterTime = Date.now();
            chatInterval = setInterval(() => {
                if (isHovering) {
                    const time = Date.now() - enterTime;
                    let prefixTime = 0;
                    for (const message of messageList) {
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
        discordButton.addEventListener('mouseleave', () => {
            isHovering = false;
            updateMessage("Hey, you!");
            enterTime = 0;
            clearInterval(chatInterval);
        });
        clearInterval(waitingInterval);
    }
});
