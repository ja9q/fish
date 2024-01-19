import { expendBait, printInventory } from './InventoryScript';
import { getInventory, getInventoryDispatch, getGDisplayDispatch, getTextboxDispatch, getInputSetter, getLocation, getAddLine } from './ScriptImports';

let fishes = require('../0data/fish.json').fish;



let timerId = null;
let hasBite = false;

export function castLine () {
    const inventory = getInventory();
    const inventoryDispatch = getInventoryDispatch();
    const gdisplayDispatch = getGDisplayDispatch();
    const textboxDispatch = getTextboxDispatch();

    if (expendBait(inventory, inventoryDispatch)){
        var biteTimer = Math.floor(Math.random() * 4 + 1);
        textboxDispatch({"type": "setFlavor", "new": "you're waiting for a bite..."});
        gdisplayDispatch({"type": "setOverlay", "newImage": {"image": "linewaiting", "alt": "your bob is floating in the water."}});
        gdisplayDispatch({"type": "showOverlay"});
    
        timerId = setTimeout(biteEvent, biteTimer * 1000);
    } else {
        alert("you don't have any bait equipped!")
    }
    
}

function biteEvent() {
    
    const gdisplayDispatch = getGDisplayDispatch();
    const textboxDispatch = getTextboxDispatch();
    hasBite = true;
    const setInputMode = getInputSetter();
    gdisplayDispatch({"type": "setOverlay", "newImage": {"image": "linebite", "alt": "your bob moved because a fish bit it!"}});
    textboxDispatch({"type": "setFlavor", "new": "you got a bite!!"});
    timerId = setTimeout(() => {hasBite = false; gdisplayDispatch({"type": "setOverlay", "newImage": {"image": "linenothing", "alt": "you reeled in nothing..."}}); textboxDispatch({"type": "setFlavor", "new": "the fish got away..."}); setInputMode("continue")}, 2000);
}

export function reelIn() {
    const inventoryDispatch = getInventoryDispatch();
    const gdisplayDispatch = getGDisplayDispatch();
    const textboxDispatch = getTextboxDispatch();
    const location = getLocation();
    const addLine = getAddLine();

    if(hasBite){
        gdisplayDispatch({"type": "clearDisplay"});
        clearTimeout(timerId);
        let caughtFish = generateFish(location.fish);
        gdisplayDispatch({"type": "setFish", "newImage": fishes[caughtFish].image});
        gdisplayDispatch({"type": "showFish"});

        textboxDispatch({"type": "setFlavor", "new": "you reeled in a "+fishes[caughtFish].name+"!"});
        addLine("Caught a "+fishes[caughtFish].name+"!");
        inventoryDispatch({"type": "add", "item": {"type": "fish", "id": fishes[caughtFish].id}, "count": 1});
        hasBite = false;
    } else {
        clearTimeout(timerId);
        gdisplayDispatch({"type": "setOverlay", "newImage": {"image": "linenothing", "alt": "you reeled in nothing..."}});
        textboxDispatch({"type": "setFlavor", "new": "you reeled in too quickly! you have no fish..."});
    }
}

function generateFish(locationFish) {
    const fishGacha = Math.random()* 100;
    let caughtFish = 0;
    locationFish.forEach(f => {
    if (f.chance > fishGacha){
        caughtFish = f.fish;
    }
    });
    return caughtFish;
}