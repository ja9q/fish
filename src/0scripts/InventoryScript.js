import { getInventory, getInventoryDispatch, getWallet, getWalletSetter } from './ScriptImports';

let bait = require('../0data/bait.json').baits;
let rod = require('../0data/rod.json').rods;
let fish = require('../0data/fish.json').fish;
let miscItems = require('../0data/others.json').others;

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

export function sellItem(item, price) {
    const setWallet = getWalletSetter();
    const inventoryDispatch = getInventoryDispatch();

    setWallet(getWallet() + price);
    inventoryDispatch({"type": "remove", "count": 1, "item": item})
}

export function buyItem(listing, price) {
    const setWallet = getWalletSetter();
    const inventoryDispatch = getInventoryDispatch();

    setWallet(getWallet() - price);
    inventoryDispatch({"type": "add", "count": listing.count, "item": listing.item})
}

export function hasItem(target) {
    const inventory = getInventory();
    inventory.forEach(item => {
        if(item.type === target.type && item.id === target.id)
            return true;
    })
    return false
}

export function equipItem(target) {
    const inventoryDispatch = getInventoryDispatch();

    inventoryDispatch({"type": "equip", "item": target})
}