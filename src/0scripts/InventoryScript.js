import { getInventory, getInventoryDispatch, getWallet, getWalletSetter, getAddLine } from './ScriptImports';
import { bait, rod, fish, miscItems } from './GeneralScript';
import click_light from '../0assets/sfx/click_light.mp3'
import money_sfx from '../0assets/sfx/money_sfx.mp3'



export function getItem(item) {
    switch(item.type) {
      case 'bait':
        return bait[item.id];
      case 'rod':
        return rod[item.id];
      case 'fish':
        return fish[item.id];
      default:
        return miscItems[item.id];
    }
  }

export function getEquippedBait() {
    const inventory = getInventory();
    let equippedBait = null;

    inventory.forEach((item) => {
        if (item.type === "bait" && item.equipped){
            equippedBait = item;
        }
    });
    return equippedBait;
}

export function getEquippedRod() {
    const inventory = getInventory();
    let equippedRod = null;

    inventory.forEach(item => {
        if (item.type === "rod" && item.equipped){
            equippedRod = item;
        }
    });
    return equippedRod;
}

export function expendBait() {
    const inventory = getInventory();
    const inventoryDispatch = getInventoryDispatch();
    
    const equippedBait = getEquippedBait(inventory);

    if (equippedBait !== null)
    {
        inventoryDispatch({"type": "remove", "count": 1, "item": equippedBait});
        return equippedBait;
    }
    
    // return null because there is no bait
    return null;
}

export function printInventory() {
    const inventory = getInventory();
    let i = [];
    inventory.forEach(item => {
        i.push(item.type + item.id);
    })
    alert(i);
}

export function sellItem(item, price) {
    const sfx = new Audio(money_sfx)
    sfx.play();
    const setWallet = getWalletSetter();
    const inventoryDispatch = getInventoryDispatch();
    const addLine = getAddLine();

    
    addLine("Sold the " + getItem(item).name + ". (+$"+price.toFixed(2)+")");
    setWallet(getWallet() + price);
    inventoryDispatch({"type": "remove", "count": 1, "item": item})
}

export function buyItem(listing, price) {
    const sfx = new Audio(money_sfx)
    sfx.play();
    const addLine = getAddLine();
    const setWallet = getWalletSetter();
    const inventoryDispatch = getInventoryDispatch();

    addLine("Janine bought the " + listing.listing + "! (-$"+price.toFixed(2)+")");
    setWallet(getWallet() - price);
    inventoryDispatch({"type": "add", "count": listing.count, "item": listing.item})
}

export function hasItem(target) {
    let result = false;
    const inventory = getInventory();
    inventory.forEach(item => {
        if(item.type === target.type && item.id === target.id)
            result = true;
    })
    return result;
}

export function equipItem(target) {
    const sfx = new Audio(click_light)
    sfx.play();
    const addLine = getAddLine();
    const inventoryDispatch = getInventoryDispatch();

    addLine("Equipped the " + getItem(target).name + " ("+target.type+")")
    inventoryDispatch({"type": "equip", "item": target})
}