let fishes = require('../0data/fish.json').fish;

let gdisplayDispatch = null;
let setFlavor = null;
let timerId = null;

let hasBite = false;

export function castLine (g, f) {
    gdisplayDispatch = g;
    setFlavor = f;

    var biteTimer = Math.floor(Math.random() * 4 + 1);
    setFlavor("You're waiting for a bite...")
    gdisplayDispatch({"type": "setOverlay", "newImage": {"image": "linewaiting", "alt": "your bob is floating in the water."}});
    gdisplayDispatch({"type": "showOverlay"});
    setTimeout(biteEvent, biteTimer * 1000);
}

function biteEvent() {
    hasBite = true;
    gdisplayDispatch({"type": "setOverlay", "newImage": {"image": "linebite", "alt": "your bob moved because a fish bit it!"}});
    // changeFlavor("you got a bite!!");
    timerId = setTimeout(() => {hasBite = false; gdisplayDispatch({"type": "setOverlay", "newImage": {"image": "linenothing", "alt": "you reeled in nothing..."}});}, 2000);
}

export function reelIn(inventoryDispatch) {
    alert("hi")
    // gdisplayDispatch({"type": "clearDisplay"});
    // if(hasBite){
    //     clearTimeout(timerId);
    //     const fishGacha = Math.random()* 100;
    //     let caughtFish = 0;
    //     location.locationFish.forEach(f => {
    //     if (f.chance > fishGacha){
    //         caughtFish = f.fish;
    //     }
    //     });
    //     setDisplayFish(fishes[caughtFish]);
    //     setFishOnDisplay(true);
    //     changeFlavor("you reeled in a "+fishes[caughtFish].name+"!");
    //     addLine("caught a "+fishes[caughtFish].name+"!");
    //     setInput("continue");
    //     setBite(false);
    // } else {
    //     clearTimeout(timerId);
    //     setInput("continue");
    //     setOverlay({"isShowing": true, "image": "linenothing", "alt": "you reeled in nothing..."});
    //     changeFlavor("you reeled in too quickly! you have no fish...");
    // }
}