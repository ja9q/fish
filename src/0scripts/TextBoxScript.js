import { getTextboxDispatch, getLocation } from "./ScriptImports";


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
    textboxDispatch({"type": "setFlavor", "new": location.flavor});
}