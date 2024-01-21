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

export function displayListing(listing, price, item, canBuy, inStock)
{
    const textboxDispatch = getTextboxDispatch();
    const cannotBuy = " (too expensive)"
    const notStocked = " (no longer in stock)"
    let subheader = (canBuy) ? "$"+price.toFixed(2) : "$"+price.toFixed(2) + cannotBuy;
    subheader = (inStock) ? subheader : "$"+price.toFixed(2) + notStocked;
    textboxDispatch({"type": "setHeader", "new": listing.listing});
    textboxDispatch({"type": "setSubheader", "new": subheader});
    textboxDispatch({"type": "setFlavor", "new": listing.flavor});
    textboxDispatch({"type": "setSprite", "new": item.image});
    textboxDispatch({"type": "showSprite"});
}