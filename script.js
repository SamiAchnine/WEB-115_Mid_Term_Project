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

    document.body.style.background = "url(" + area.background + ")";
    captionContainer.textContent = area.text;
    
    // choices section
    let choice1Button = document.createElement("button");
    choice1Button.id = "choice1";
    choicesContainer.append(choice1Button);
    choice1Button.textContent = area.choices[0];

    let choice2Button = document.createElement("button");
    choice2Button.id = 'choice2';
    choicesContainer.append(choice2Button);
    choice2Button.textContent = area.choices[1];
}

let dummyArea = new Room();

dummyArea.location = "dummy locale";
dummyArea.character = "./characterImages/skye_pose.png";
dummyArea.text = "dummy text";
dummyArea.choices = ["Choice 1", "Choice 2"];

document.addEventListener("load", updateArea(dummyArea));
