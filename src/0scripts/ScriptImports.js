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
let qteExport = null;
let qteDispatchExport = null;

export function initScriptImports(inventory, inventoryDispatch, gdisplayDispatch, location, setLocation, textboxDispatch, setInputMode, addLine, atShop, wallet, setWallet, qte, qteDispatch) {   
    inventoryExport = inventory;
    inventoryDispatchExport = inventoryDispatch;
    gdisplayDispatchExport = gdisplayDispatch;
    locationExport = location;
    setLocationExport = setLocation;
    textboxDispatchExport = textboxDispatch;
    setInputModeExport = setInputMode;
    addLineExport = addLine;
    atShopExport = atShop;
    walletExport = wallet;
    setWalletExport = setWallet;
    qteExport = qte;
    qteDispatchExport = qteDispatch;
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

export function getQTE(){
    return qteExport;
}

export function getQteDispatch() {
    return qteDispatchExport;
}