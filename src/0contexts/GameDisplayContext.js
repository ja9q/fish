import { createContext, useContext, useReducer } from 'react';

export const GDisplayContext = createContext(null);
export const GDisplayDispatchContext = createContext(null);

export function useGDisplay() {
    return useContext(GDisplayContext);
}

export function useGDisplayDispatch() {
    return useContext(GDisplayDispatchContext);
}

export function GDisplayProvider({ children }) {
  const [gdisplay, dispatch] = useReducer(
    gdisplayReducer,
    {"visual": {"image": "greenhornlake", "alt": "Greenhorn Lake"},
    "showsOverlay": false,
    "showsFish": false,
    "overlay": {"image": "", "alt": ""},
    "fishDisplay": {"image": "", "alt": ""}}
  );

  return (
    <GDisplayContext.Provider value={gdisplay}>
      <GDisplayDispatchContext.Provider value={dispatch}>
        {children}
      </GDisplayDispatchContext.Provider>
    </GDisplayContext.Provider>
  );
}

function gdisplayReducer(gdisplay, action) {
switch (action.type) {
    case 'changeLocation': {
        return changeVisual(gdisplay, action);
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

function changeVisual(gdisplay, action) {
    gdisplay = clearDisplay(gdisplay);
    gdisplay.visual = action.newImage;
    return gdisplay;
}

function clearDisplay(gdisplay) {
    gdisplay.showsOverlay = false;
    gdisplay.showsFish = false;
    return gdisplay;
}

function showOverlay(gdisplay) {
    gdisplay.showsFish = false;
    gdisplay.showsOverlay = true;
    return gdisplay;
}

function showFish(gdisplay) {
    gdisplay.showsFish = true;
    gdisplay.showsOverlay = false;
    return gdisplay;
}

function setOverlay(gdisplay, action) {
    gdisplay.overlay = action.newImage;
    return gdisplay;
}

function setFish(gdisplay, action) {
    gdisplay.fish = action.newImage;
    return gdisplay;
}

