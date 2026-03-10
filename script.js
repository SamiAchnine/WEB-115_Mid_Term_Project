const locationContainer = document.getElementById("locationContainer");
const playerImgContainer = document.getElementById("playerImgContainer");
const captionContainer = document.getElementById("captionContainer");
const choicesContainer = document.getElementById("choicesContainer");


class Room {
    constructor(location, character, background, text, choices) {
        this.location = location;
        this.character = character;
        this.background = background;
        this.text = text;
        this.choices = choices;
    }
}

function updateArea(area) {
    locationContainer.textContent = area.location;
    playerImgContainer.src = area.character;
    playerImgContainer.height = 500;

    document.body.style.background = `linear-gradient(rgba(0,0,0,0.375), rgba(0,0,0,0.375)), url(${area.background}) center / cover no-repeat`;; 
    // the above CSS is brought to you in part by GPT, again

    document.body.style.backgroun

    captionContainer.textContent = area.text;

    choicesContainer.innerHTML = "";

    // this foreach loop was created with help from GPT, in an attempt to make the buttons actually move you to the right area
    area.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice.text;
        button.addEventListener("click", () => updateArea(choice.next));
        choicesContainer.append(button);
    });
}


// -------------------------- AREA HELL --------------------------
// ALL THE BELOW CODE IS RAW, UNFILTERED, AND ABYSMAL, AS I AM 
// LITERALLY JUST DECLARING ROOMS YOU WILL GO TO. THE FIRST THREE
// ARE FOR DEBUG USE ONLY!

const dummyArea_1 = new Room("locale 1", "./characterImages/holly_idle.png", "./backgroundImages/splatsville.jpg", "text 1", []);

const dummyArea_0 = new Room(
    "locale 0",
    "./characterImages/elliot_pose.png",
    "./backgroundImages/lemuriaHub.jpeg",
    "text 0",
    [{ text: "Go to area 1", next: dummyArea_1 }]
);

const dummyLoadArea = new Room(
    "dummy locale",
    "./characterImages/skye_pose.png",
    undefined,
    "dummy text",
    [{ text: "Start", next: dummyArea_0 }]
);

document.addEventListener("load", updateArea(dummyLoadArea));