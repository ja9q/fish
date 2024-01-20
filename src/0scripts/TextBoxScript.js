import { getTextboxDispatch, getLocation, getAtShop } from "./ScriptImports";


export function displayItem(item) {
    const textboxDispatch = getTextboxDispatch();
    textboxDispatch({"type": "setHeader", "new": item.name});
    textboxDispatch({"type": "setSubheader", "new": item.subtitle});
    textboxDispatch({"type": "setFlavor", "new": item.flavor});
    textboxDispatch({"type": "setSprite", "new": item.image});
    textboxDispatch({"type": "showSprite"});
}

export function displayLocation() {
    const textboxDispatch = getTextboxDispatch();
    const location = getLocation();
    textboxDispatch({"type": "reset"});
    textboxDispatch({"type": "setHeader", "new": location.name});
    if(!getAtShop()){
        textboxDispatch({"type": "setFlavor", "new": location.flavor});
    } else {
        textboxDispatch({"type": "setFlavor", "new": "welcome to the shop! you can buy the displayed items or sell your fish by clicking on them from your inventory."});
        textboxDispatch({"type": "setSubheader", "new": "the shop"});
    }
    
}