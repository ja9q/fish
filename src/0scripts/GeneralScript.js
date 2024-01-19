import { getLocation, getLocationSetter, getAddLine, getGDisplayDispatch } from "./ScriptImports";
import { displayLocation } from "./TextBoxScript";

let locations = require('../0data/locations.json').locations;

function importImages(r) {
let images = {};
r.keys().forEach((item, index) => { images[item.replace('./', '').replace('.png', '')] = r(item); });
    return images;
}

export const backgrounds = importImages(require.context('../0assets/backgrounds', false, /\.(png)$/));
export const sprites = importImages(require.context('../0assets/sprites', false, /\.(png)$/));
export const miscImg = importImages(require.context('../0assets/misc', false, /\.(png)$/));
  
export function changeLocation(loc) {
    const setLocation = getLocationSetter();
    const location = getLocation();
    const addLine = getAddLine();

    const gdisplayDispatch = getGDisplayDispatch;
    gdisplayDispatch({"type": "clearDisplay"});
    setLocation(locations[loc]);
    gdisplayDispatch({"type": "setVisual", "newImage": locations[loc].image});
    if (loc !== location.locationId)
        addLine("travelled to "+locations[loc].locationName+".");
    displayLocation();
}