export const initialQTE = {
    "qtePos": 0,
    "qteCursor": 0,
    "fishPos": 28.5,
    "fishTravel": null
};

export function qteReducer(qte, action) {
switch (action.type) {
    case 'changeAreaPos': {
        return changeAreaPos(qte);
    }
    case 'setCursor': {
        return setCursor(qte, action);
    }
    case 'setFishPos': {
        return setFishPos(qte,action);
    }
    case 'setFishTravel': {
        return setFishTravel(qte,action);
    }
    default: {
        throw Error('Unknown action: ' + action.type);
    }
}
}

function clone(qte) {
    return {
        "qtePos": qte.qtePos,
        "qteCursor": qte.qteCursor,
        "fishPos": qte.fishPos,
        "fishTravel": qte.fishTravel
    };
}

function changeAreaPos(qte) {
    let temp = clone(qte);
    temp.qtePos = Math.random()* 360;
    return temp;
}

function setCursor(qte, action) {
    let temp = clone(qte);
    temp.qteCursor = action.new;
    return temp;
}

function setFishPos(qte, action) {
    let temp = clone(qte);
    temp.fishPos = action.new;
    return temp;
}

function setFishTravel(qte, action) {
    let temp = clone(qte);
    temp.fishTravel = action.new;
    return temp;
}