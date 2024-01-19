let inventoryExport = null;
let inventoryDispatchExport = null;
let gdisplayExport = null;
let gdisplayDispatchExport = null;
let locationExport = null;
let setLocationExport = null;
let textboxDispatchExport = null;
let setInputModeExport = null;
let addLineExport = null;

export function initScriptImports(inventory, inventoryDispatch, gdisplay, gdisplayDispatch, location, setLocation, textboxDispatch, setInputMode, addLine) {
    inventoryExport = inventory;
    inventoryDispatchExport = inventoryDispatch;
    gdisplayExport = gdisplay;
    gdisplayDispatchExport = gdisplayDispatch;
    locationExport = location;
    setLocationExport = setLocation;
    textboxDispatchExport = textboxDispatch;
    setInputModeExport = setInputMode;
    addLineExport = addLine;
}

export function getInventory() {
    return inventoryExport;
}

export function getInventoryDispatch() {
    return inventoryDispatchExport;
}

export function getGDisplay() {
    return gdisplayExport;
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

