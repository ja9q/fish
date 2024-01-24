export const initialGDisplay =
    {"visual": {"image": "greenhornlake", "alt": "Greenhorn Lake"},
    "showsOverlay": false,
    "showsFish": false,
    "showsQTE": false,
    "overlay": {"image": "", "alt": ""},
    "fishDisplay": {"image": "", "alt": ""}};

export function gdisplayReducer(gdisplay, action) {
switch (action.type) {
    case 'setVisual': {
        return setVisual(gdisplay, action);
    }
    case 'clearDisplay': {
        return clearDisplay(gdisplay);
    }
    case 'showOverlay': {
        return showOverlay(gdisplay);
    }
    case 'showFish': {
        return showFish(gdisplay);
    }
    case 'showQTE': {
        return showQTE(gdisplay,action)
    }
    case 'setOverlay': {
        return setOverlay(gdisplay, action);
    }
    case 'setFish': {
        return setFish(gdisplay, action);
    }
    default: {
        throw Error('Unknown action: ' + action.type);
    }
}
}

function clone(gdisplay) {
    return {"visual": gdisplay.visual,
        "showsOverlay": gdisplay.showsOverlay,
        "showsFish": gdisplay.showsFish,
        "showsQTE": gdisplay.showsQTE,
        "overlay": gdisplay.overlay,
        "fishDisplay": gdisplay.fishDisplay};
}

function setVisual(gdisplay, action) {
    let temp = clone(gdisplay);
    temp.showsOverlay = false;
    temp.showsFish = false;
    temp.showsQTE = false;
    temp.visual = action.newImage;
    return temp;
}

function clearDisplay(gdisplay) {
    let temp = clone(gdisplay);
    temp.showsOverlay = false;
    temp.showsFish = false;
    temp.showsQTE = false;
    return temp;
}

function showOverlay(gdisplay) {
    let temp = clone(gdisplay);
    temp.showsOverlay = true;
    temp.showsFish = false;
    temp.showsQTE = false;
    return temp;
}

function showFish(gdisplay) {
    let temp = clone(gdisplay);
    temp.showsOverlay = false;
    temp.showsFish = true;
    temp.showsQTE = false;
    return temp;
}

function showQTE(gdisplay) {
    let temp = clone(gdisplay);
    temp.showsOverlay = false;
    temp.showsFish = false;
    temp.showsQTE = true;
    return temp;
}

function setOverlay(gdisplay, action) {
    let temp = clone(gdisplay);
    temp.overlay = action.newImage;
    return temp;
}

function setFish(gdisplay, action) {
    let temp = clone(gdisplay);
    temp.fishDisplay = action.newImage;
    return temp;
}

