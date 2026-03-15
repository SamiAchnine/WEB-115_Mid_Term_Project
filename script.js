const locationContainer = document.getElementById("locationContainer");
const playerImgContainer = document.getElementById("playerImgContainer");
const captionContainer = document.getElementById("captionContainer");
const choicesContainer = document.getElementById("choicesContainer");
const imageToolTipContainer = document.getElementById("imageToolTipContainer");
const anarchySplatcastSFX = new Audio("./BGM_Plaza_News_Intro.ogg")

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

    // makes image blank if set as undefined in order to not display a broken image link
    if (area.characterImg === undefined) {
        playerImgContainer.style.display = "none";
    }
    else {
        playerImgContainer.style.display = "block";
        playerImgContainer.src = area.characterImg;
        playerImgContainer.height = 500;
    }

    document.body.style.background = `linear-gradient(rgba(0,0,0,0.375), rgba(0,0,0,0.375)), url(${area.background}) 0px 0px / cover no-repeat`;; 
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

    if (currentArea === EpilogueBox1) {
        anarchySplatcastSFX.play();
    }
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

const ENDING = new Room(
    "ENDING",
    undefined,
    "",
    undefined,
    "End.",
    []
);

const EpilogueBox13 = new Room(
    "Inside Holly's apartment",
    "./characterImages/holly_idle.png",
    "",
    undefined,
    "Wow, that’s pretty cool, I was technically on the news!",
    [{text: "Continue to Ending", next: ENDING}]
);

const EpilogueBox12 = new Room(
    "Anarchy Splatcast",
    undefined,
    "",
    "./backgroundImages/anarchySplatcast.jpg",
    "Shiver: Well, that’s all for this one. Let’s see the current battle stages.",
    [{text: "Continue", next: EpilogueBox13}]
);

const EpilogueBox11 = new Room(
    "Anarchy Splatcast",
    undefined,
    "",
    "./backgroundImages/anarchySplatcast.jpg",
    "Big Man: Ay, ayy, ayyyy!",
    [{text: "Continue", next: EpilogueBox12}]
);

const EpilogueBox10 = new Room(
    "Anarchy Splatcast",
    undefined,
    "",
    "./backgroundImages/anarchySplatcast.jpg",
    "Shiver: There was a mothership there?",
    [{text: "Continue", next: EpilogueBox11}]
);

const EpilogueBox9 = new Room(
    "Anarchy Splatcast",
    undefined,
    "",
    "./backgroundImages/anarchySplatcast.jpg",
    "Frye: No one knows who did it, but good job! Would’ve probably taken Grizzco weeks to sort the Mothership out.",
    [{text: "Continue", next: EpilogueBox10}]
);

const EpilogueBox8 = new Room(
    "Anarchy Splatcast",
    undefined,
    "",
    "./backgroundImages/anarchySplatcast.jpg",
    "Shiver: My bad, I guess. *sigh*, yeah, the tower was cleared up.",
    [{text: "Continue", next: EpilogueBox9}]
);

const EpilogueBox7 = new Room(
    "Anarchy Splatcast",
    undefined,
    "",
    "./backgroundImages/anarchySplatcast.jpg",
    "Big Man: AYYY!",
    [{text: "Continue", next: EpilogueBox8}]
);

const EpilogueBox6 = new Room(
    "Anarchy Splatcast",
    undefined,
    "",
    "./backgroundImages/anarchySplatcast.jpg",
    "Shiver: I guess so. Not like anyone cares.",
    [{text: "Continue", next: EpilogueBox7}]
);

const EpilogueBox5 = new Room(
    "Anarchy Splatcast",
    undefined,
    "",
    "./backgroundImages/anarchySplatcast.jpg",
    "Frye: Wait, we've gote an update on the Inkopolis situation? Did they seriously get it fixed?",
    [{text: "Continue", next: EpilogueBox6}]
);

const EpilogueBox4 = new Room(
    "Anarchy Splatcast",
    undefined,
    "",
    "./backgroundImages/anarchySplatcast.jpg",
    "Big Man: Ay!",
    [{text: "Continue", next: EpilogueBox5}]
);

const EpilogueBox3 = new Room(
    "Anarchy Splatcast",
    undefined,
    "",
    "./backgroundImages/anarchySplatcast.jpg",
    "Frye: Anarchy Splatcast! We’re live!",
    [{text: "Continue", next: EpilogueBox4}]
);

const EpilogueBox2 = new Room(
    "Anarchy Splatcast",
    undefined,
    "",
    "./backgroundImages/anarchySplatcast.jpg",
    "Shiver: Repping the splatlands, we are DEEP CUT!",
    [{text: "Continue", next: EpilogueBox3}]
);

const EpilogueBox1 = new Room(
    "Anarchy Splatcast",
    undefined,
    "",
    undefined,
    "Holly checks the news broadcast the next morning.",
    [{text: "Continue", next: EpilogueBox2}]
);

// CHAPTER 4b

const chapter4bBox12 = new Room(
    "Inside Holly's Apartment",
    undefined,
    "",
    undefined,
    "Sign posted, sleep achieved!",
    [{text: "Continue to epilogue", next: EpilogueBox1}]
);

const chapter4bBox11 = new Room(
    "Inside Holly's Apartment",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    undefined,
    "Should I do the homework? No… I’m just tired right now. I saved Inkopolis after all.",
    [{text: "Continue", next: chapter4bBox12}]
);

const chapter4bBox10 = new Room(
    "The Square",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "Bye!",
    [{text: "Continue", next: chapter4bBox11}]
);

const chapter4bBox9 = new Room(
    "The Square",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "I’ll stay out here, I wanted to get something to eat before heading home. See you tomorrow, both of you!",
    [{text: "Continue", next: chapter4bBox10}]
);

const chapter4bBox8 = new Room(
    "The Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "I mean, you sure we have time? Looks a bit too late to me.",
    [{text: "Continue", next: chapter4bBox9}]
);

const chapter4bBox7 = new Room(
    "The Square",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "Alright, let’s head back to Splatsville and celebrate a bit!",
    [{text: "Continue", next: chapter4bBox8}]
);

const chapter4bBox6 = new Room(
    "The Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/ammoKnightsInkopolis.jpg",
    "Good sign. Let’s just tape it here… surely Donny won’t mind if we put it next to his store.",
    [{text: "Continue", next: chapter4bBox7}]
);

const chapter4bBox5 = new Room(
    "The Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "“There were a lot of salmonids here, but they’ve been cleared out since the mothership hit. Pretty sure the mothership is gone, call the police if they show up again.”",
    [{text: "Continue", next: chapter4bBox6}]
);

const chapter4bBox4 = new Room(
    "The Square",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "Well, it can’t be too hard. I’ll just scribble a bit of this down… Good.",
    [{text: "Continue", next: chapter4bBox5}]
);

const chapter4bBox3 = new Room(
    "The Square",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "What should the sign say?",
    [{text: "Continue", next: chapter4bBox4}]
);

const chapter4bBox2 = new Room(
    "The Square",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "I see it, I see it. Not the work part, but it is getting a bit late.",
    [{text: "Continue", next: chapter4bBox3}]
);

const chapter4bBox1 = new Room(
    "The Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "We should just put up a sign and leave, honestly. Would mean I get home in time to do some work.",
    [{text: "Continue", next: chapter4bBox2}]
);

// CHAPTER 4AB

const chapter4abBox7 = new Room(
    "Inside Holly's Apartment",
    undefined,
    "",
    undefined,
    "ENDING - Sleep achieved!",
    [{text: "Continue to epilogue", next: EpilogueBox1}]
);

const chapter4abBox6 = new Room(
    "Inside Holly's Apartment",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    undefined,
    "Homework can wait. Sleep now.",
    [{text: "Continue", next: chapter4abBox7}]
);

const chapter4abBox5 = new Room(
    "Inside Holly's Apartment",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    undefined,
    "Phew, what a day. Not all the time that I save Inkopolis, huh.",
    [{text: "Continue", next: chapter4abBox6}]
);

const chapter4abBox4 = new Room(
    "The Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Thank you so much guys… See you!",
    [{text: "Continue", next: chapter4abBox5}]
);

const chapter4abBox3 = new Room(
    "The Square",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "I’ll bring you something tomorrow from our celebration, but absolutely go get some rest.",
    [{text: "Continue", next: chapter4abBox4}]
);

const chapter4abBox2 = new Room(
    "The Square",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "Holly, it’s fine. You did amazing out there. You deserve sleep, queen.",
    [{text: "Continue", next: chapter4abBox3}]
);

const chapter4abBox1 = new Room(
    "The Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Nah, I’m totally fried. I’ve gotta head home. Sorry guys…",
    [{text: "Continue", next: chapter4abBox2}]
);

const chapter4aaBox13 = new Room(
    "The Square",
    undefined,
    "",
    undefined,
    "ENDING - Great job, everyone!",
    [{text: "Continue to epilogue", next: EpilogueBox1}]
);

const chapter4aaBox12 = new Room(
    "The Square",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/crustySean.jpg",
    "Yeah!!",
    [{text: "Continue", next: chapter4aaBox13}]
);

const chapter4aaBox11 = new Room(
    "The Square",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/crustySean.jpg",
    "I mean, you probably should take the food home, but c’mon, we just took down hordes of salmonids on our own! That calls for a feast!",
    [{text: "Continue", next: chapter4aaBox12}]
);

const chapter4aaBox10 = new Room(
    "The Square",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/crustySean.jpg",
    "Nahhhh you’ll be fine. I would never be a bad influence.",
    [{text: "Continue", next: chapter4aaBox11}]
);

const chapter4aaBox9 = new Room(
    "The Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/crustySean.jpg",
    "It’s getting a bit late, I might get in trouble homework-wise if I stick around.",
    [{text: "Continue", next: chapter4aaBox10}]
);

const chapter4aaBox8 = new Room(
    "The Square",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/crustySean.jpg",
    "Good deal. That’s a good spot to sit.",
    [{text: "Continue", next: chapter4aaBox9}]
);

const chapter4aaBox7 = new Room(
    "The Square - Formerly Crusty Sean's Food Truck",
    undefined,
    "",
    "./backgroundImages/crustySean.jpg",
    "...",
    [{text: "Continue", next: chapter4aaBox8}]
);

const chapter4aaBox6 = new Room(
    "The Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "That’s alright, let’s go get something from there and head out.",
    [{text: "Continue", next: chapter4aaBox7}]
);

const chapter4aaBox4 = new Room(
    "The Square",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/insideBrokenLobby.jpg",
    "Despite bearing his likeness, no, it’s not run by him anymore. It’s run by someone else now.",
    [{text: "Continue", next: chapter4aaBox6}]
);

const chapter4aaBox3 = new Room(
    "The Square",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "I remember Crusty Sean, he was working on some crusty adventure last time we saw him!",
    [{text: "Continue", next: chapter4aaBox4}]
);

const chapter4aaBox2 = new Room(
    "The Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Ooh, let’s go there, the little food truck!",
    [{text: "Continue", next: chapter4aaBox3}]
);

const chapter4aaBox1 = new Room(
    "The Square",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "Despite the totally busted tower, seems most businesses are operating just fine!",
    [{text: "Yeah!", next: chapter4aaBox2}]
);

const chapter4aBox11 = new Room(
    "The Square",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/insideBrokenLobby.jpg",
    "All done, shall we celebrate our success?",
    [
        {text: "Yeah!", next: chapter4aaBox1},
        {text: "No, I'm tired", next: chapter4abBox1}
    ]
);

const chapter4aBox10 = new Room(
    "The Square",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/insideBrokenLobby.jpg",
    "Hello, we found the issue with the tower and got rid of it, there was a mothership… yep… Okay, understood. Thanks, sir!",
    [{text: "Continue", next: chapter4aBox11}]
);

const chapter4aBox9 = new Room(
    "The Square",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/insideBrokenLobby.jpg",
    "Ah, this is the phone number, let me give it a call.",
    [{text: "Continue", next: chapter4aBox10}]
);

const chapter4aBox8 = new Room(
    "The Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/insideBrokenLobby.jpg",
    "Yep, this sure was hit by a mothership!",
    [{text: "Continue", next: chapter4aBox9}]
);

const chapter4aBox7 = new Room(
    "The Square",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "Let’s get moving here…",
    [{text: "Continue", next: chapter4aBox8}]
);

const chapter4aBox6 = new Room(
    "The Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Hey, why are you dragging me into this?",
    [{text: "Continue", next: chapter4aBox7}]
);

const chapter4aBox5 = new Room(
    "The Square",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "No, Skye, you’re not going in alone. We’re all going together to check. Never know when you need someone to yank you away from falling debris.",
    [{text: "Continue", next: chapter4aBox6}]
);

const chapter4aBox3 = new Room(
    "The Square",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "Here I come!",
    [{text: "Continue", next: chapter4aBox5}]
);

const chapter4aBox2 = new Room(
    "The Square",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "It was on the inside of the lobby building… is it safe to go in and check?",
    [{text: "Continue", next: chapter4aBox3}]
);

const chapter4aBox1 = new Room(
    "The Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Anyone know the Inkopolis police phone number? We aren’t gonna call the fast response number, definitely.",
    [{text: "Continue", next: chapter4aBox2}]
);

const chapter4Box5 = new Room(
    "The Square",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "I think the least we can do is…",
    [
        {text: "Let the police know", next: chapter4aBox1},
        {text: "Put up a sign and go back home before it gets dark", next: chapter4bBox1}
    ]
);

const chapter4Box4 = new Room(
    "The Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Absolutely agree. Plus, it’s starting to get dark.",
    [{text: "Continue", next: chapter4Box5}]
);

const chapter4Box3 = new Room(
    "The Square",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "It took them years to build this tower for the first time. I don’t think a group of three school-age children could fix it in an afternoon.",
    [{text: "Continue", next: chapter4Box4}]
);

const chapter4Box2 = new Room(
    "The Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Seems like a LOT of work.",
    [{text: "Continue", next: chapter4Box3}]
);

const chapter4Box1 = new Room(
    "The Square",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "So we’ve gotta fix the tower now, huh.",
    [{text: "Continue", next: chapter4Box2}]
);

const chapter3Box6 = new Room(
    "Inside Holly's Apartment",
    undefined,
    "",
    undefined,
    "ENDING - Homework done!",
    [{text: "Continue to ending", next: ENDING}]
);

const chapter3Box5 = new Room(
    "Inside Holly's Apartment",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    undefined,
    "Argghhhhhhhhhhh…",
    [{text: "Continue", next: chapter3Box6}]
);

const chapter3Box4 = new Room(
    "Inside Holly's Apartment",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    undefined,
    "Oh, fun. I still have homework to do. And it’s already dark out.",
    [{text: "Continue", next: chapter3Box5}]
);

const chapter3Box3 = new Room(
    "Plaza",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/plaza.jpg",
    "See you probably not in class tomorrow!",
    [{text: "Continue", next: chapter3Box4}]
);

const chapter3Box2 = new Room(
    "Plaza",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/plaza.jpg",
    "See you in class tomorrow.",
    [{text: "Continue", next: chapter3Box3}]
);

const chapter3Box1 = new Room(
    "Plaza",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/plaza.jpg",
    "Bye everyone!",
    [{text: "Continue", next: chapter3Box2}]
);

const chapter2bBox30 = new Room(
    "Inkopolis Square",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "Job done, let’s go home.",
    [{text: "Continue", next: chapter3Box1}]
);

const chapter2bBox29 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_pose.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Thank goodness, I’m so tired after all that, I don’t know if I can do any of my homework.",
    [{text: "Continue", next: chapter2bBox30}]
);

const chapter2bBox28 = new Room(
    "Inkopolis Square",
    "./characterImages/skye_pose.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "It was the sound of the mothership running out of salmonids to spawn, I think we dealt with it.",
    [{text: "Continue", next: chapter2bBox29}]
);

const chapter2bBox27 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_pose.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Skye, what was that noise??",
    [{text: "Continue", next: chapter2bBox28}]
);

const chapter2bBox26 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_pose.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "AHH!",
    [{text: "Continue", next: chapter2bBox27}]
);

const chapter2bBox25 = new Room (
    "Inkopolis Square",
    undefined,
    "",
    "./backgroundImages/inkopolis.jpg",
    "BANG!",
    [{text: "Continue", next: chapter2bBox26}]
);

const chapter2bBox24 = new Room(
    "Inkopolis Square",
    "./characterImages/skye_pose.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "Sounds like a deal.",
    [{text: "Continue", next: chapter2bBox25}]
);

const chapter2bBox23 = new Room(
    "Inkopolis Square",
    "./characterImages/elliot_pose.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "So how about I take care of the salmonids it spawns and you two focus on that mothership.",
    [{text: "Continue", next: chapter2bBox24}]
);

const chapter2bBox22 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_pose.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "There’s probably one in there, I think I saw the blue metal thing they always use on the outside of those ships.",
    [{text: "Continue", next: chapter2bBox23}]
);

const chapter2bBox21 = new Room (
    "Inkopolis Square",
    undefined,
    "",
    "./backgroundImages/inkopolis.jpg",
    "Holly makes an attempt at checking…",
    [{text: "Continue", next: chapter2bBox22}]
);

const chapter2bBox20 = new Room(
    "Inkopolis Square",
    "./characterImages/elliot_pose.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "So go check, then?",
    [{text: "Continue", next: chapter2bBox21}]
);

const chapter2bBox19 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_pose.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Well, we don’t know if it's still there or not?",
    [{text: "Continue", next: chapter2bBox20}]
);

const chapter2bBox18 = new Room(
    "Inkopolis Square",
    "./characterImages/elliot_pose.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "Okay, these salmonids are getting on my nerves. How about I take care of them and you two focus the mothership?",
    [{text: "Continue", next: chapter2bBox19}]
);

const chapter2bBox17 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_pose.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Sorry…",
    [{text: "Continue", next: chapter2bBox18}]
);

const chapter2bBox16 = new Room(
    "Inkopolis Square",
    "./characterImages/elliot_pose.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "What did I tell you two dialog boxes ago?",
    [{text: "Continue", next: chapter2bBox17}]
);

const chapter2bBox15 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_pose.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Oh come on!",
    [{text: "Continue", next: chapter2bBox16}]
);

const chapter2bBox14 = new Room(
    "Inkopolis Square",
    "./characterImages/skye_pose.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "I wouldn’t be so certain. There might be a mothership hiding in the cut off tower’s rubble.",
    [{text: "Continue", next: chapter2bBox15}]
);

const chapter2bBox13 = new Room(
    "Inkopolis Square",
    "./characterImages/elliot_pose.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "Could you quit whining? We’re almost done here, certainly.",
    [{text: "Continue", next: chapter2bBox14}]
);

const chapter2bBox12 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_pose.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "It’s been an hour already, why is it taking so long?",
    [{text: "Continue", next: chapter2bBox13}]
);

const chapter2bBox11 = new Room (
    "Inkopolis Square",
    undefined,
    "",
    "./backgroundImages/inkopolis.jpg",
    "...",
    [{text: "Continue", next: chapter2bBox12}]
);

const chapter2bBox10 = new Room(
    "Inkopolis Square",
    "./characterImages/skye_pose.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "Just lock in already, the salmonids aren’t gonna rid themselves.",
    [{text: "Continue", next: chapter2bBox11}]
);

const chapter2bBox9 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_pose.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "God forbid a girl be lazy!",
    [{text: "Continue", next: chapter2bBox10}]
);

const chapter2bBox8 = new Room(
    "Inkopolis Square",
    "./characterImages/skye_pose.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "Holly, you suck.",
    [{text: "Continue", next: chapter2bBox9}]
);

const chapter2bBox7 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_pose.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Dang, thought I could get out of it.",
    [{text: "Continue", next: chapter2bBox8}]
);

const chapter2bBox6 = new Room(
    "Inkopolis Square",
    "./characterImages/elliot_pose.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "Go back and get your dualies, two people can’t handle this.",
    [{text: "Continue", next: chapter2bBox7}]
);


const chapter2bBox5 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Hm?",
    [{text: "Continue", next: chapter2bBox6}]
);

const chapter2bBox4 = new Room(
    "Inkopolis Square",
    "./characterImages/elliot_pose.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "Could you not?",
    [{text: "Continue", next: chapter2bBox5}]
);


const chapter2bBox3 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "How about I leave you guys to it?",
    [{text: "Continue", next: chapter2bBox4}]
);

const chapter2bBox2 = new Room(
    "Inkopolis Square",
    "./characterImages/skye_pose.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "Well, that seems pretty short-sighted. We’ve got a salmonid problem that Mr Grizz hasn’t even heard of yet!",
    [{text: "Continue", next: chapter2bBox3}]
);

const chapter2bBox1 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "I left my dualies at home, since I had rightfully assumed that we were getting homework at school today, so I then wouldn’t go and battle after.",
    [{text: "Continue", next: chapter2bBox2}]
);

const chapter2aBox16 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_pose.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Alright guys, looks like a job well done! What now?",
    [
        {text: "Go home", next: chapter3Box1},
        {text: "Fix the tower", next: chapter4Box1}
    ]
);

const chapter2aBox15 = new Room(
    "Inkopolis Square",
    "./characterImages/elliot_pose.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "Better than no answer, I guess.",
    [{text: "Continue", next: chapter2aBox16}]
);

const chapter2aBox14 = new Room(
    "Inkopolis Square",
    "./characterImages/skye_pose.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "I’m pretty sure.",
    [{text: "Continue", next: chapter2aBox15}]
);

const chapter2aBox13 = new Room(
    "Inkopolis Square",
    "./characterImages/elliot_pose.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "So it’s gone then?",
    [{text: "Continue", next: chapter2aBox14}]
);

const chapter2aBox12 = new Room(
    "Inkopolis Square",
    "./characterImages/skye_pose.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "This wave of salmonids is the last one!",
    [{text: "Continue", next: chapter2aBox13}]
);

const chapter2aBox11 = new Room(
    "Inkopolis Square",
    "./characterImages/elliot_pose.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "But is it still working?",
    [{text: "Continue", next: chapter2aBox12}]
);

const chapter2aBox10 = new Room(
    "Inkopolis Square",
    "./characterImages/skye_pose.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "That boom wasn’t from the mothership, it was me :3",
    [{text: "Continue", next: chapter2aBox11}]
);

const chapter2aBox9 = new Room(
    "Inkopolis Square",
    undefined,
    "",
    "./backgroundImages/inkopolis.jpg",
    "BOOM!",
    [{text: "Continue", next: chapter2aBox10}]
);

const chapter2aBox8 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_pose.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Sounds like a plan.",
    [{text: "Continue", next: chapter2aBox9}]
);

const chapter2aBox7 = new Room(
    "Inkopolis Square",
    "./characterImages/elliot_pose.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "Okay, these salmonids are getting on my nerves. How about I take care of them and you two focus the mothership?",
    [{text: "Continue", next: chapter2aBox8}]
);

const chapter2aBox6 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_pose.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "It sure is taking a while…",
    [{text: "Continue", next: chapter2aBox7}]
);

const chapter2aBox5 = new Room(
    "Inkopolis Square",
    "./characterImages/skye_pose.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "If there’s one thing I study, it’s how to best take down these Salmonid machines, and if there’s one thing I know about salmonid machines, it’s that this mothership has gotta go!",
    [{text: "Continue", next: chapter2aBox6}]
);

const chapter2aBox4 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_pose.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "I guess we just have to keep pummeling it until it eventually stops working, huh. If that’s how it works, I guess.",
    [{text: "Continue", next: chapter2aBox5}]
);

const chapter2aBox3 = new Room(
    "Inkopolis Square",
    "./characterImages/elliot_pose.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "I think I can just barely make out what looks like the mothership’s vacuum hose. How is it still working under all this rubble though?",
    [{text: "Continue", next: chapter2aBox4}]
);

const chapter2aBox2 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_pose.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Why are there so many? Is there a mothership in the rubble or something?",
    [{text: "Continue", next: chapter2aBox3}]
);

const chapter2aBox1 = new Room(
    "Inkopolis Square",
    undefined,
    "",
    "./backgroundImages/inkopolis.jpg",
    "Holly and the gang fought hard, but more salmonids kept spawning.",
    [{text: "Continue", next: chapter2aBox2}]
);

const chapter2Box7 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "(Do I fight?)",
    [
        {text: "Yes!", next: chapter2aBox1},
        {text: "No", next: chapter2bBox1}
    ]
);

const chapter2Box6 = new Room(
    "Inkopolis Square",
    "./characterImages/elliot_pose.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/inkopolis.jpg",
    "Good thing I brought my Hornz Dread Wringer here!",
    [{text: "Continue", next: chapter2Box7}]
);

const chapter2Box5 = new Room(
    "Inkopolis Square",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "WAH! Those are salmonids!",
    [{text: "Continue", next: chapter2Box6}]
);

const chapter2Box4 = new Room(
    "Inkopolis Square",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/inkopolis.jpg",
    "Wait, why do I see green ink here, sort of inside the tower?",
    [{text: "Continue", next: chapter2Box5}]
);

const chapter2Box3 = new Room(
    "Inkopolis Square",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/inkopolis.jpg",
    "Woah! The tower looks like it got cut in half! I guess it being ‘hit’ was a bit of an exaggeration.",
    [{text: "Continue", next: chapter2Box4}]
);

const chapter2Box2 = new Room(
    "Plaza - Train Station",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/plazaTrainStation.jpg",
    "Alright.",
    [{text: "Continue", next: chapter2Box3}]
);

const chapter2Box1 = new Room(
    "Plaza - Train Station",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/plazaTrainStation.jpg",
    "We’re already at the station here, let’s go to Inkopolis.",
    [{text: "Continue", next: chapter2Box2}]
);

// CHAPTER 1B

const chapter1bTableTurfBox10 = new Room(
    "Plaza - Train Station",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/plazaTrainStation.jpg",
    "Let’s do this.",
    [{text: "Continue", next: chapter2Box3}]
);

const chapter1bTableTurfBox9 = new Room(
    "Plaza - Train Station",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/plazaTrainStation.jpg",
    "I’m ready!",
    [{text: "Continue", next: chapter1bTableTurfBox10}]
);

const chapter1bTableTurfBox8 = new Room(
    "Plaza - Train Station",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/plazaTrainStation.jpg",
    "So what do you all say, ready?",
    [{text: "Continue", next: chapter1bTableTurfBox9}]
);

const chapter1bTableTurfBox7 = new Room(
    "Plaza - Train Station",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/plazaTrainStation.jpg",
    "Phew! Haven’t run faster in a really long time. Really wish we could swim through some ink to get here.",
    [{text: "Continue", next: chapter1bTableTurfBox8}]
);

const chapter1bTableTurfBox6 = new Room(
    "Plaza - Train Station",
    undefined,
    "",
    "./backgroundImages/plazaTrainStation.jpg",
    "...",
    [{text: "Continue", next: chapter1bTableTurfBox7}]
);

const chapter1bTableTurfBox5 = new Room(
    "Next to tableturf",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/tableTurf.jpg",
    "That makes a lot of sense, well, now that we’re all united, we gotta go!",
    [{text: "Continue", next: chapter1bTableTurfBox6}]
);

const chapter1bTableTurfBox4 = new Room(
    "Next to tableturf",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/tableTurf.jpg",
    "A mothership flew by and hit the tower!",
    [{text: "Continue", next: chapter1bTableTurfBox5}]
);

const chapter1bTableTurfBox3 = new Room(
    "Next to tableturf",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/tableTurf.jpg",
    "We found some juicy tidbits about the Inkopolis situation — It’s crazy!",
    [{text: "Continue", next: chapter1bTableTurfBox4}]
);

const chapter1bTableTurfBox2 = new Room(
    "Next to tableturf",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/tableTurf.jpg",
    "I couldn’t find any leads, so I thought the Tableturf clerk would help, but unfortunately I’ve got to wait in line.",
    [{text: "Continue", next: chapter1bTableTurfBox3}]
);

const chapter1bTableTurfBox1 = new Room(
    "Next to tableturf",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/tableTurf.jpg",
    "There you are Elliot!",
    [{text: "Continue", next: chapter1bTableTurfBox2}]
);

const chapter1bManOWardrobeBox7 = new Room(
    "Man-o'-Wardrobe",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/manOWardrobe.jpg",
    "It’s all or nothing.",
    [{text: "Continue", next: chapter1bTableTurfBox1}]
);

const chapter1bManOWardrobeBox6 = new Room(
    "Man-o'-Wardrobe",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/manOWardrobe.jpg",
    "Interesting, but okay! Let’s go there and head to Inkopolis, quick, they need us!",
    [{text: "Continue", next: chapter1bManOWardrobeBox7}]
);

const chapter1bManOWardrobeBox5 = new Room(
    "Man-o'-Wardrobe",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/manOWardrobe.jpg",
    "Yeah, I caught a glimpse of him on my way to Naut Couture, and it seems he was headed toward the tableturf battle table.",
    [{text: "Continue", next: chapter1bManOWardrobeBox6}]
);

const chapter1bManOWardrobeBox4 = new Room(
    "Man-o'-Wardrobe",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/manOWardrobe.jpg",
    "Elliot was up by the lobby area, right?",
    [{text: "Continue", next: chapter1bManOWardrobeBox5}]
);

const chapter1bManOWardrobeBox3 = new Room(
    "Man-o'-Wardrobe",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/manOWardrobe.jpg",
    "That’s horrible! We’ve got to get Elliot and go now!",
    [{text: "Continue", next: chapter1bManOWardrobeBox4}]
);

const chapter1bManOWardrobeBox2 = new Room(
    "Man-o'-Wardrobe",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/manOWardrobe.jpg",
    "Yeah, I found out. As it turns out, a mothership crashed into the tower!",
    [{text: "Continue", next: chapter1bManOWardrobeBox3}]
);

const chapter1bManOWardrobeBox1 = new Room(
    "Man-o'-Wardrobe",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/manOWardrobe.jpg",
    "Oh, hi Holly! Did you find a lead?",
    [{text: "Continue", next: chapter1bManOWardrobeBox2}]
);

const chapter1bAmmoKnights = new Room(
    "Ammo Knights",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/ammoKnights.jpg",
    "Doesn't appear to be here.",
    []
);

const chapter1bNautCouture = new Room(
    "Naut Couture",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/NautCouture.jpg",
    "Doesn't appear to be here.",
    []
);


const chapter1bCrushStation = new Room(
    "Crush Station",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/crushStation.jpg",
    "Doesn't appear to be here.",
    []
);

const chapter1bHotlantis = new Room(
    "Hotlantis",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/hotlantis.jpg",
    "Doesn't appear to be here.",
    []
);

const chapter1bBox2 = new Room(
    "At the end of the road with the shops",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/endOfRoad.png",
    "I can’t see her too well, which store could she be in?",
    []
);

// this is done to avoid ReferenceError

chapter1bBox2.choices = [{text: "Ammo Knights", next: chapter1bAmmoKnights}, {text: "Naut Couture", next: chapter1bNautCouture}, {text: "Man-o'-Wardrobe", next: chapter1bManOWardrobeBox1}, {text: "Crush Station", next: chapter1bCrushStation}, {text: "Hotlantis", next: chapter1bHotlantis}];

chapter1bHotlantis.choices = [{text: "Ammo Knights", next: chapter1bAmmoKnights}, {text: "Naut Couture", next: chapter1bNautCouture}, {text: "Man-o'-Wardrobe", next: chapter1bManOWardrobeBox1}, {text: "Crush Station", next: chapter1bCrushStation}];

chapter1bCrushStation.choices = [{text: "Ammo Knights", next: chapter1bAmmoKnights}, {text: "Naut Couture", next: chapter1bNautCouture}, {text: "Man-o'-Wardrobe", next: chapter1bManOWardrobeBox1}, {text: "Hotlantis", next: chapter1bHotlantis}];

chapter1bNautCouture.choices = [{text: "Ammo Knights", next: chapter1bAmmoKnights}, {text: "Man-o'-Wardrobe", next: chapter1bManOWardrobeBox1}, {text: "Crush Station", next: chapter1bCrushStation}, {text: "Hotlantis", next: chapter1bHotlantis}];

chapter1bAmmoKnights.choices = [{text: "Naut Couture", next: chapter1bNautCouture}, {text: "Man-o'-Wardrobe", next: chapter1bManOWardrobeBox1}, {text: "Crush Station", next: chapter1bCrushStation}, {text: "Hotlantis", next: chapter1bHotlantis}];


const chapter1bBox1 = new Room(
    "Inside the lobby",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/lobby.jpg",
    "Skye said she was around the shops area, let me head there!",
    [{text: "Continue", next: chapter1bBox2}]
);

// CHAPTER 1a FIND SKYE

const chapter1aFindSkyeBox12 = new Room(
    "By the train station",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/plazaTrainStation.jpg",
    "Let’s do this.",
    [{text: "To Inkopolis!", next: chapter2Box3}]
);

const chapter1aFindSkyeBox11 = new Room(
    "By the train station",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/plazaTrainStation.jpg",
    "I’m ready!",
    [{text: "Continue", next: chapter1aFindSkyeBox12}]
);

const chapter1aFindSkyeBox10 = new Room(
    "By the train station",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/plazaTrainStation.jpg",
    "Yep. Shall we go?",
    [{text: "Continue", next: chapter1aFindSkyeBox11}]
);

const chapter1aFindSkyeBox9 = new Room(
    "By the train station",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/plazaTrainStation.jpg",
    "It’s the mothership, right?",
    [{text: "Continue", next: chapter1aFindSkyeBox10}]
);

const chapter1aFindSkyeBox8 = new Room(
    "By the train station",
    "./characterImages/skye_idle.png",
    "A squid whose family is from Inkopolis. She was a big fan of the Squid Sisters as a little kid, and never really left that phase. Met Holly more recently, but they became really close friends quickly. She frequently misses class to win more turf war battles, making her really good at turf war!",
    "./backgroundImages/plazaTrainStation.jpg",
    "I thought you were still looking around, but I got some information!",
    [{text: "Continue", next: chapter1aFindSkyeBox9}]
);

const chapter1aFindSkyeBox7 = new Room(
    "By the train station",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/plazaTrainStation.jpg",
    "There you are Skye!",
    [{text: "Continue", next: chapter1aFindSkyeBox8}]
);

const chapter1aFindSkyeBox6 = new Room(
    "At the end of the road with the shops",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/endOfRoad.png",
    "Let’s go there then!",
    [{text: "Continue", next: chapter1aFindSkyeBox7}]
);

const chapter1aFindSkyeBox5 = new Room(
    "At the end of the road with the shops",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/endOfRoad.png",
    "Probably at the railway station if she got information already.",
    [{text: "Continue", next: chapter1aFindSkyeBox6}]
);

const chapter1aFindSkyeBox4 = new Room(
    "At the end of the road with the shops",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/endOfRoad.png",
    "Where’d she go? We looked everywhere and she isn’t here!",
    [{text: "Continue", next: chapter1aFindSkyeBox5}]
);

const chapter1aFindSkyeBox3 = new Room(
    "At the end of the road with the shops",
    undefined,
    "",
    "./backgroundImages/endOfRoad.png",
    "...",
    [{text: "Continue", next: chapter1aFindSkyeBox4}]
);

const chapter1aFindSkyeBox2 = new Room(
    "Next to tableturf",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/tableTurf.jpg",
    "Time’s a-wasting, we gotta get her, quick!",
    [{text: "Continue", next: chapter1aFindSkyeBox3}]
);

const chapter1aFindSkyeBox1 = new Room(
    "Next to tableturf",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/tableTurf.jpg",
    "If I remember correctly, she was toward the shops.",
    [{text: "Continue", next: chapter1aFindSkyeBox2}]
);

// CHAPTER 1a TABLE TURF BATTLE

const chapter1aTableTurfBattleBox7 = new Room(
    "Next to tableturf",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/tableTurf.jpg",
    "C’mon, we gotta find Skye and get to Inkopolis, quick!",
    [{text: "Continue", next: chapter1aFindSkyeBox1}]
);

const chapter1aTableTurfBattleBox6 = new Room(
    "Next to tableturf",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/tableTurf.jpg",
    "Those salmonids will pay for this!",
    [{text: "Continue", next: chapter1aTableTurfBattleBox7}]
);

const chapter1aTableTurfBattleBox5 = new Room(
    "Next to tableturf",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/tableTurf.jpg",
    "As it turns out, a mothership crashed into the tower!",
    [{text: "Continue", next: chapter1aTableTurfBattleBox6}]
);

const chapter1aTableTurfBattleBox4 = new Room(
    "Next to tableturf",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/tableTurf.jpg",
    "I wanted to play a little bit since I had gotten bored, but what’s the situation over there?",
    [{text: "Continue", next: chapter1aTableTurfBattleBox5}]
);

const chapter1aTableTurfBattleBox3 = new Room(
    "Next to tableturf",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/tableTurf.jpg",
    "I found out about the situation… and why are you in line for a game of tableturf?",
    [{text: "Continue", next: chapter1aTableTurfBattleBox4}]
);

const chapter1aTableTurfBattleBox2 = new Room(
    "Next to tableturf",
    "./characterImages/elliot_idle.png",
    "An energetic little fella, loves cheering up Holly when she’s feeling down. He met Holly in secondary school, and have frequently been part of the same team in turf war battles they’ve played. His glasses were a gift from Holly on Elliot’s 14th birthday. He doesn’t need them, but still likes them for the awesome fit.",
    "./backgroundImages/tableTurf.jpg",
    "Yeah?",
    [{text: "Continue", next: chapter1aTableTurfBattleBox3}]
);

const chapter1aTableTurfBattleBox1 = new Room(
    "Next to tableturf",
    "./characterImages/holly_idle.png",
    "Native born in the Splatlands. She lives in a cozy state, with her comfy hoodie and headphones, enjoying laid back holiday breaks.",
    "./backgroundImages/tableTurf.jpg",
    "Elliot!",
    [{text: "Continue", next: chapter1aTableTurfBattleBox2}]
);

// CHAPTER 1a

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

// CHAPTER 1

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

// PROLOGUE

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

// DEBUG USE ONLY

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
document.addEventListener("load", updateArea(prologueBox1));