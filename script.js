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
    overlayBio.id = "bioOverlayText";
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
// LITERALLY JUST DECLARING ROOMS YOU WILL GO TO. THE LAST THREE
// ARE FOR DEBUG USE ONLY!

/* 
Bio for Skye to copy paste:
A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!
*/

/* 
Bio for Elliot to copy paste:
An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.
*/

/* 
Bio for Holly to copy paste:
Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.
*/

const chapter1aTableTurfBattleBox1 = new Room(
    "Next to tableturf",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/tableTurf.jpg",
    "Elliot!",
    [{text: "Continue", next: chapter1aTableTurfBattleBox2}]
);

const chapter1aBox2 = new Room(
    "Inside the lobby",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/lobby.jpg",
    "Could he be around the Tableturf battle table?",
    [{text: "Yeah, he could be there!", next: chapter1aTableTurfBattleBox1}]
);

const chapter1aBox1 = new Room(
    "Inside the lobby",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/lobby.jpg",
    "If I remember correctly, Elliot should be around here, but I don’t see him...",
    [{text: "Continue", next: chapter1aBox2}]
);

const chapter1Box15 = new Room(
    "Inside the lobby",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/lobby.jpg",
    "I’ve gotta go find the rest of the gang now, where are they at?",
    [
        {text: "Find Elliot", next: chapter1aBox1},
        {text: "Find Skye", next: chapter1bBox1}
    ]
);

const chapter1Box14 = new Room(
    "Inside the Lobby - Crab-N-Go",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/crabNGo.jpg",
    "That’s all I wanted to know, thanks Ma’am!",
    [{text: "Continue", next: chapter1Box15}]
);

const chapter1Box13 = new Room(
    "Inside the Lobby - Crab-N-Go",
    undefined,
    "Marigold is an employee that works at Crab-N-Go. You go there to ask her about the Inkopolis situation.",
    "./backgroundImages/crabNGo.jpg",
    "Oh it’s a shame, dear. Apparently a mothership crashed into the tower at the Square. Those dirty salmonids better keep themselves out of our Inkopolis if they know what’s good for them!",
    [{text: "Continue", next: chapter1Box14}]
);

const chapter1Box12 = new Room(
    "Inside the Lobby - Crab-N-Go",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/crabNGo.jpg",
    "I was wondering if you know anything about the situation in Inkopolis?",
    [{text: "Continue", next: chapter1Box13}]
);

const chapter1Box11 = new Room(
    "Inside the Lobby - Crab-N-Go",
    undefined,
    "Marigold is an employee that works at Crab-N-Go. You go there to ask her about the Inkopolis situation.",
    "./backgroundImages/crabNGo.jpg",
    "Hello dear, what can I do for you on this lovely day!",
    [{text: "Continue", next: chapter1Box12}]
);

const chapter1Box10 = new Room(
    "Plaza - Apartments",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/apartments.jpg",
    "Apparently the lady at the Crab-N-Go knows. I'd better go there.",
    [{text: "Continue", next: chapter1Box11}]
);

const chapter1Box9 = new Room(
    "Plaza - Apartments",
    "./characterImages/jamesjelli_idle.jpg",
    "A random Jelly on the street that you talk to in order to get information on what could've happened in Inkopolis. He does not know Inkling language at all, but lucky for you, you know Jelly language!",
    "./backgroundImages/apartments.jpg",
    "Blororp roooorp!",
    [{text: "Continue", next: chapter1Box10}]
);

const chapter1Box8 = new Room(
    "Plaza - Apartments",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/apartments.jpg",
    "Thanks James!",
    [{text: "Continue", next: chapter1Box9}]
);

const chapter1Box7 = new Room(
    "Plaza - Apartments",
    "./characterImages/jamesjelli_idle.jpg",
    "A random Jelly on the street that you talk to in order to get information on what could've happened in Inkopolis. He does not know Inkling language at all, but lucky for you, you know Jelly language!",
    "./backgroundImages/apartments.jpg",
    "Blorp blorp glorp!",
    [{text: "Continue", next: chapter1Box8}]
);

const chapter1Box6 = new Room(
    "Plaza - Apartments",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/apartments.jpg",
    "Oh, well that’s unfortunate, know anyone who saw it?",
    [{text: "Continue", next: chapter1Box7}]
);

const chapter1Box5 = new Room(
    "Plaza - Apartments",
    "./characterImages/jamesjelli_idle.jpg",
    "A random Jelly on the street that you talk to in order to get information on what could've happened in Inkopolis. He does not know Inkling language at all, but lucky for you, you know Jelly language!",
    "./backgroundImages/apartments.jpg",
    "Blorop?",
    [{text: "Continue", next: chapter1Box6}]
);

const chapter1Box4 = new Room(
    "Plaza - Apartments",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/apartments.jpg",
    "Excuse me sir, you saw the news right?",
    [{text: "Continue", next: chapter1Box5}]
);

const chapter1Box3 = new Room(
    "Plaza",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/plaza.jpg",
    "Got it",
    [{text: "Continue", next: chapter1Box4}]
);

const chapter1Box2 = new Room(
    "Plaza",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/plaza.jpg",
    "Good idea, Holly, how about you check up toward those apartments. I’ll check down toward the shops, and Elliot, how about you go ask people in front of the tower, where we are now?",
    [{text: "Continue", next: chapter1Box3}]
);

const chapter1Box1 = new Room(
    "Plaza",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/plaza.jpg",
    "We should probably ask people around here if they know who did it!",
    [{text: "Continue", next: chapter1Box2}]
);

const prologueBox13 = new Room(
    "Plaza",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/plaza.jpg",
    "Well, we just came back from the academy, and that’s over in Inkopolis. (What should I do?)",
    [
        {text: "Ask the Splatlandians for leads", next: chapter1Box1},
        {text: "Go to Inkopolis", next: chapter2Box1}
    ]
);

const prologueBox12 = new Room(
    "Plaza",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/plaza.jpg",
    "Guys, should we go investigate in Inkopolis?",
    [{text: "Continue", next: prologueBox13}]
);

const prologueBox11 = new Room(
    "Plaza",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/plaza.jpg",
    "If it turns out that it is the Octarians, though, I know I’m cooked...",
    [{text: "Continue", next: prologueBox12}]
);

const prologueBox10 = new Room(
    "Plaza",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/plaza.jpg",
    "Apparently the people who hit the tower were from some underground society. I know it’s not the octarians.",
    [{text: "Continue", next: prologueBox11}]
);

const prologueBox9 = new Room(
    "Plaza",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/plaza.jpg",
    "Well… now that you mention all of that, maybe the homework isn’t too important.",
    [{text: "Continue", next: prologueBox10}]
);

const prologueBox8 = new Room(
    "Plaza - Train Station",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/plazaTrainStation.jpg",
    "WHAT?? I thought you had checked the homework online, I was gonna tell you about it.",
    [{text: "Continue", next: prologueBox9}]
);

const prologueBox7 = new Room(
    "Plaza",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/plaza.jpg",
    "Yeah! They hit Inkopolis tower! We gotta do something about it!",
    [{text: "Continue", next: prologueBox8}]
);

const prologueBox6 = new Room(
    "Plaza - Train Station",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/plazaTrainStation.jpg",
    "Skye, did you see the news?",
    [{text: "Continue", next: prologueBox7}]
);

const prologueBox5 = new Room(
    "Plaza",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/plaza.jpg",
    "What!! They hit the Inkopolis Tower?!",
    [{text: "Continue", next: prologueBox6}]
);

const prologueBox4 = new Room(
    "Outside Inkblot Art Academy",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/school.jpg",
    "My question is how Skye will do all this, she was absent today, yet again. What is she up to?",
    [{text: "Cut to Skye...", next: prologueBox5}]
);

const prologueBox3 = new Room(
    "Outside Inkblot Art Academy",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/school.jpg",
    "It’s really *not* that bad, I’ve already done half of it during lunch. And plus, it’s not even due tomorrow.",
    [{text: "Continue", next: prologueBox4}]
);

const prologueBox2 = new Room(
    "Outside Inkblot Art Academy",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/school.jpg",
    "Agh, there’s so much homework I’m gonna jump in that pool over there! Why must life be so hard!",
    [{text: "Continue", next: prologueBox3}]
);

const prologueBox1 = new Room(
    "Initial Area",
    undefined,
    "",
    undefined,
    "Welcome to the Splatlands! A world where chaos rules and where you get to see the life of one Octoling named Holly! Let’s join her as she leaves school for the day.",
    [{text: "Okay!", next: prologueBox2}]
);

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
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    undefined,
    "dummy text",
    [{ text: "Start", next: dummyArea_0 }]
);


// the one last event listener to load the first area.
document.addEventListener("load", updateArea(dummyLoadArea));