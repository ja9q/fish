let inventoryExport = null;
let inventoryDispatchExport = null;
let gdisplayDispatchExport = null;
let locationExport = null;
let setLocationExport = null;
let textboxDispatchExport = null;
let setInputModeExport = null;
let addLineExport = null;
let atShopExport = null;
let walletExport = null;
let setWalletExport = null;
let recordsDispatchExport = null;

export function initScriptImports() {   
    inventoryExport = arguments[0];
    inventoryDispatchExport = arguments[1];
    gdisplayDispatchExport = arguments[2];
    locationExport = arguments[3];
    setLocationExport = arguments[4];
    textboxDispatchExport = arguments[5];
    setInputModeExport = arguments[6];
    addLineExport = arguments[7];
    atShopExport = arguments[8];
    walletExport = arguments[9];
    setWalletExport = arguments[10];
    recordsDispatchExport = arguments[11];
}

export function updateImports(inventory, wallet, location, atShop) {
    inventoryExport = inventory;
    walletExport = wallet;
    locationExport = location;
    atShopExport = atShop;
}

export function getInventory() {
    return inventoryExport;
}

export function getInventoryDispatch() {
    return inventoryDispatchExport;
}

export function getGDisplayDispatch() {
    return gdisplayDispatchExport;
}

export function getLocation() {
    return locationExport;
}

export function getLocationSetter() {
    return setLocationExport;
}

export function getInputSetter() {
    return setInputModeExport;
}

export function getTextboxDispatch() {
    return textboxDispatchExport;
}

export function getAddLine() {
    return addLineExport;
}

export function getAtShop() {
    return atShopExport;
}

export function getWallet() {
    return walletExport;
}

export function getWalletSetter() {
    return setWalletExport;
}

export function getRecordsDispatch() {
    return recordsDispatchExport;
}
