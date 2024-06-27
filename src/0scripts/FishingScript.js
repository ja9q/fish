import { expendBait, printInventory } from './InventoryScript';
import { fish } from './GeneralScript';
import { getInventory, getInventoryDispatch, getGDisplayDispatch, getTextboxDispatch, getInputSetter, getLocation, getAddLine, getRecordsDispatch, getVolume } from './ScriptImports';
import { getEquippedRod, getItem } from './InventoryScript';
import water_splash from '../0assets/sfx/water_splash.mp3'
import water_drip from '../0assets/sfx/water_drip.mp3'
import Records from '../NonGame/Records';


let timerId = null;
let usedBait = null;
let hasBite = false;

export function castLine () {
    const setInputMode = getInputSetter();
    const inventory = getInventory();
    const inventoryDispatch = getInventoryDispatch();
    const gdisplayDispatch = getGDisplayDispatch();
    const textboxDispatch = getTextboxDispatch();

    const addLine = getAddLine();

    usedBait = expendBait(inventory, inventoryDispatch);

    if (usedBait !== null){
        var biteTimer = Math.floor(Math.random() * 4 + 1);
        setInputMode("fishing");
        textboxDispatch({"type": "setFlavor", "new": "you're waiting for a bite..."});
        gdisplayDispatch({"type": "setOverlay", "newImage": {"image": "linewaiting", "alt": "your bob is floating in the water."}});
        gdisplayDispatch({"type": "showOverlay"});
    
        timerId = setTimeout(biteEvent, biteTimer * 1000);
    } else {
        alert("you don't have any bait equipped!");
        setInputMode("at-water");
    }
    
}

function biteEvent() {
    const volume = getVolume();


    let drip = new Audio(water_drip);
    drip.volume = volume;
    drip.play();
    const gdisplayDispatch = getGDisplayDispatch();
    const textboxDispatch = getTextboxDispatch();
    const recordDispatch = getRecordsDispatch();
    recordDispatch({"type": "bite"});
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
    const recordDispatch = getRecordsDispatch();
    const location = getLocation();
    const addLine = getAddLine();
    const volume = getVolume();

    if(hasBite){

        let sfx = new Audio(water_splash)
        sfx.volume = volume;
        sfx.play()
        gdisplayDispatch({"type": "clearDisplay"});
        clearTimeout(timerId);
        let caughtFish = generateFish(location.fish);
        gdisplayDispatch({"type": "setFish", "newImage": fish[caughtFish].image});
        gdisplayDispatch({"type": "showFish"});

        textboxDispatch({"type": "setFlavor", "new": "you reeled in a "+fish[caughtFish].name+"!"});
        addLine("Caught a "+fish[caughtFish].name+"!");
        inventoryDispatch({"type": "add", "item": {"type": "fish", "id": fish[caughtFish].id}, "count": 1});
        hasBite = false;
    } else {
        clearTimeout(timerId);
        recordDispatch({"type": "failedCatch"});
        gdisplayDispatch({"type": "setOverlay", "newImage": {"image": "linenothing", "alt": "you reeled in nothing..."}});
        textboxDispatch({"type": "setFlavor", "new": "you reeled in too quickly! you have no fish..."});  
    }
}

function generateFish(locationFish) {
    const recordDispatch = getRecordsDispatch();

    const baitTier = getItem(usedBait).tier;
    const rodTier = getItem(getEquippedRod()).tier;

    const maxFishTier = Math.ceil((baitTier + rodTier) / 2.0)

    const fishGacha = Math.random()* 100;
    let caughtFish = 0;
    locationFish.forEach(f => {
    if (f.chance > fishGacha && fish[f.fish].rarity <= maxFishTier){
        caughtFish = f.fish;
    }
    });


    if (caughtFish !== 0) {
        recordDispatch({"type": "caughtFish", "fish": caughtFish});
    }
    

    return caughtFish;
}