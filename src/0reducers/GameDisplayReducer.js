export const initialGDisplay =
    {"visual": {"image": "greenhornlake", "alt": "Greenhorn Lake"},
    "showsOverlay": false,
    "showsFish": false,
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

function setVisual(gdisplay, action) {
    return {"visual": action.newImage,
        "showsOverlay": false,
        "showsFish": false,
        "overlay": gdisplay.overlay,
        "fishDisplay": gdisplay.fishDisplay};
}

function clearDisplay(gdisplay) {
    return {"visual": gdisplay.visual,
        "showsOverlay": false,
        "showsFish": false,
        "overlay": gdisplay.overlay,
        "fishDisplay": gdisplay.fishDisplay};
}

function showOverlay(gdisplay) {
    return {"visual": gdisplay.visual,
        "showsOverlay": true,
        "showsFish": false,
        "overlay": gdisplay.overlay,
        "fishDisplay": gdisplay.fishDisplay};
}

function showFish(gdisplay) {
    return {"visual": gdisplay.visual,
        "showsOverlay": false,
        "showsFish": true,
        "overlay": gdisplay.overlay,
        "fishDisplay": gdisplay.fishDisplay};
}

function setOverlay(gdisplay, action) {
    return {"visual": gdisplay.visual,
        "showsOverlay": gdisplay.showsOverlay,
        "showsFish": gdisplay.showsFish,
        "overlay": action.newImage,
        "fishDisplay": gdisplay.fishDisplay};
}

function setFish(gdisplay, action) {
    return {"visual": gdisplay.visual,
        "showsOverlay": gdisplay.showsOverlay,
        "showsFish": gdisplay.showsFish,
        "overlay": gdisplay.overlay,
        "fishDisplay": action.newImage};
}

