import { getLocation, getLocationSetter, getAddLine, getGDisplayDispatch, getTextboxDispatch } from "./ScriptImports";
import { displayLocation } from "./TextBoxScript";

export const locations = require('../0data/locations.json').locations;
export const bait = require('../0data/bait.json').baits;
export const rod = require('../0data/rod.json').rods;
export const fish = require('../0data/fish.json').fish;
export const miscItems = require('../0data/others.json').others;

export const backgrounds = importImages(require.context('../0assets/backgrounds', false, /\.(png)$/));
export const sprites = importImages(require.context('../0assets/sprites', false, /\.(png)$/));
export const miscImg = importImages(require.context('../0assets/misc', false, /\.(png)$/));

function importImages(r) {
let images = {};
r.keys().forEach((item, index) => { images[item.replace('./', '').replace('.png', '')] = r(item); });
    return images;
}

export function changeLocation(loc) {
    const setLocation = getLocationSetter();
    const textboxDispatch = getTextboxDispatch();
    const location = getLocation();
    const gdisplayDispatch = getGDisplayDispatch();
    const addLine = getAddLine();

    setLocation(locations[loc]);
    displayLocation();
    gdisplayDispatch({"type": "clearDisplay"});
    gdisplayDispatch({"type": "setVisual", "newImage": locations[loc].image});
    textboxDispatch({"type": "reset"});
    textboxDispatch({"type": "setHeader", "new": locations[loc].name});
    textboxDispatch({"type": "setFlavor", "new": locations[loc].flavor});
    if (loc !== location.locationId)
        addLine("travelled to "+locations[loc].name+".");
    
}