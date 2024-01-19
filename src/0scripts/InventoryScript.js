import { getInventory, getInventoryDispatch } from './ScriptImports';

let bait = require('../0data/bait.json').baits;
let rod = require('../0data/rod.json').rods;
let fish = require('../0data/fish.json').fish;


export function getEquippedBait() {
    const inventory = getInventory();
    let equippedBait = null;

    const temp = inventory.map((item) => {
        if (item.type === "bait" && item.equipped){
            equippedBait = item;
        }
    });
    return equippedBait;
}

export function getEquippedRod() {
    const inventory = getInventory();
    inventory.forEach(item => {
        if (item.type == "rod" && item.isEquipped){
            return item;
        }
    });
}

export function expendBait() {
    const inventory = getInventory();
    const inventoryDispatch = getInventoryDispatch();
    
    const equippedBait = getEquippedBait(inventory);

    if (equippedBait !== null)
    {
        inventoryDispatch({"type": "remove", "count": 1, "item": equippedBait});
        return true;
    }
    
    // return false because there is no bait
    return false;
}

export function printInventory() {
    const inventory = getInventory();
    let i = [];
    inventory.forEach(item => {
        i.push(item.type + item.id);
    })
    alert(i);
}

export function sellItem(i) {

}