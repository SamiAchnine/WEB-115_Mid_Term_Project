const locationContainer = document.getElementById("locationContainer");
const playerImgContainer = document.getElementById("playerImgContainer");
const captionContainer = document.getElementById("captionContainer");
const choicesContainer = document.getElementById("choicesContainer");
const imageToolTipContainer = document.getElementById("imageToolTipContainer");

let currentArea;

let hovering = false;
let overlayIsOpen = false;
let enterCooldown = false;

class Room {
    constructor(location, characterImg, characterBio, background, text, choices) {
        this.location = location;
        this.characterImg = characterImg;
        this.characterBio = characterBio;
        this.background = background;
        this.text = text;
        this.choices = choices;
    }
}

/* FUNCTIONS (EXCEPT ANONYMOUS ONES) */

function createOverlay() {
    overlayIsOpen = true;
    let overlay = document.createElement("div");
    overlay.id = 'bioOverlay';

    let overlayBio = document.createElement("p");
    overlayBio.textContent = currentArea.characterBio;
    overlay.appendChild(overlayBio);
    
    let closeBox = document.createElement("div");
    closeBox.id = "bioOverlayClose";
    closeBox.innerHTML = "&times;";
    closeBox.onclick = function () {
        document.body.removeChild(overlay);
        overlayIsOpen = false;
    }
    overlay.appendChild(closeBox);

    document.body.appendChild(overlay);
}

function updateArea(area) {
    currentArea = area;
    locationContainer.textContent = area.location;
    playerImgContainer.src = area.characterImg;
    playerImgContainer.height = 500;

    document.body.style.background = `linear-gradient(rgba(0,0,0,0.375), rgba(0,0,0,0.375)), url(${area.background}) center / cover no-repeat`;; 
    // the above CSS is brought to you in part by GPT, again    

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

function imageHoverTooltipDisplay() {
    if (hovering == true) {
        imageToolTipContainer.style.display = "block";
        imageToolTipContainer.innerHTML = "Press Equal Sign button to open this person's bio!";
    }
    else {
        imageToolTipContainer.style.display = "none";
    }
}

/* EVENT LISTENERS (EXCEPT DYNAMICALLY CREATED ONES) */

document.addEventListener('keydown', (event) => {
    if (event.key === "Enter" && !enterCooldown) {
        enterCooldown = true;
        // GPT helped me come up with the cooldown solution 
        updateArea(currentArea.choices[0].next);
        setTimeout(() => {enterCooldown = false}, 560);
    }
})

playerImgContainer.addEventListener("mouseover", function () {
    hovering = true;
    imageHoverTooltipDisplay();
});
playerImgContainer.addEventListener("mouseout", function () {
    hovering = false;
    imageHoverTooltipDisplay();
});

document.addEventListener("keydown", (event) => {
    if (event.key === '=') {
        console.log(currentArea.characterBio);
        if (!overlayIsOpen) {
            createOverlay();
        }
        else {
            document.body.removeChild(document.getElementById("bioOverlay"));
            overlayIsOpen = false;
        }
    }
});


// -------------------------- AREA HELL --------------------------
// ALL THE BELOW CODE IS RAW, UNFILTERED, AND ABYSMAL, AS I AM 
// LITERALLY JUST DECLARING ROOMS YOU WILL GO TO. THE FIRST THREE
// ARE FOR DEBUG USE ONLY!


const dummyArea_1 = new Room(
    "locale 1",
    "./characterImages/holly_idle.png", 
    undefined,
    "./backgroundImages/dummy_splatsville.jpg", 
    "text 1", 
    []
);

const dummyArea_0 = new Room(
    "locale 0",
    "./characterImages/elliot_pose.png",
    undefined,
    "./backgroundImages/dummy_lemuriaHub.jpeg",
    "text 0",
    [{ text: "Go to area 1", next: dummyArea_1 }]
);

const dummyLoadArea = new Room(
    "dummy locale",
    "./characterImages/skye_pose.png",
    "This is totally Skye's Bio!",
    undefined,
    "dummy text",
    [{ text: "Start", next: dummyArea_0 }]
);


// the one last event listener to load the first area.
document.addEventListener("load", updateArea(dummyLoadArea));