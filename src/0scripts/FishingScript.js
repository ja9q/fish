
import { useState } from 'react';

let fishes = require('../0data/fish.json').fish;


export function castLine(gdisplayDispatch) {
    const [fishBite, setBite] = useState(false);
    const [timerId, setTimer] = useState(0);

    const waitTime = Math.floor(((Math.random() * location.fishWait) + 2) * 1000);
    gdisplayDispatch({"type": "setOverlay", "newImage": {"image": "linewaiting", "alt": "your bob is floating in the water."}});
    gdisplayDispatch({"type": "showOverlay"});
    setTimer(setTimeout(biteEvent, waitTime));
}
    

function biteEvent() {
    gdisplayDispatch({"type": "setOverlay", "newImage": {"image": "linebite", "alt": "your bob moved because a fish bit it!"}});
    // changeFlavor("you got a bite!!");
    // setBite(true);
    setTimer(setTimeout(() => {setBite(false); setOverlay({"isShowing": true, "image": "linenothing", "alt": "you reeled in nothing..."}); changeFlavor("the fish got away..."); setInput("continue");}, 2000));
}

// function reelIn() {
//     setOverlay({"isShowing": false});
//     if(fishBite){
//         clearTimeout(timerId);
//         const fishGacha = Math.random()* 100;
//         let caughtFish = 0;
//         location.locationFish.forEach(f => {
//         if (f.chance > fishGacha){
//             caughtFish = f.fish;
//         }
//         });
//         setDisplayFish(fishes[caughtFish]);
//         setFishOnDisplay(true);
//         changeFlavor("you reeled in a "+fishes[caughtFish].name+"!");
//         addLine("caught a "+fishes[caughtFish].name+"!");
//         setInput("continue");
//         setBite(false);
//     } else {
//         clearTimeout(timerId);
//         setInput("continue");
//         setOverlay({"isShowing": true, "image": "linenothing", "alt": "you reeled in nothing..."});
//         changeFlavor("you reeled in too quickly! you have no fish...");
//     }
// }