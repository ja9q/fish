/*
 header: "", subheader "", flavorText: "", sprite:{image/alt}, showsSprite: false
*/

export function textboxReducer(textbox, action) {
    switch (action.type) {
        case 'setHeader': {
            return setHeader(textbox, action);
        }
        case 'setSubheader': {
            return setSubheader(textbox, action);
        }
        case 'setFlavor': {
            return setFlavor(textbox, action);
        }
        case 'setSprite': {
            return setSprite(textbox, action);
        }
        case 'showSprite': {
            return showSprite(textbox);
        }
        case 'hideSprite': {
            return hideSprite(textbox);
        }
        case 'reset': {
            return reset(textbox);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}

function setHeader(textbox, action) {
    return {
        "header": action.new,
        "subheader": textbox.subheader,
        "flavorText": textbox.flavorText,
        "sprite": textbox.sprite,
        "showsSprite": textbox.showsSprite
    };
}

function setSubheader(textbox, action) {
    return {
        "header": textbox.header,
        "subheader": action.new,
        "flavorText": textbox.flavorText,
        "sprite": textbox.sprite,
        "showsSprite": textbox.showsSprite
    };
}

function setFlavor(textbox, action) {
    return {
        "header": textbox.header,
        "subheader": textbox.subheader,
        "flavorText": action.new,
        "sprite": textbox.sprite,
        "showsSprite": textbox.showsSprite
    };
}

function setSprite(textbox, action) {
    return {
        "header": textbox.header,
        "subheader": textbox.subheader,
        "flavorText": textbox.flavorText,
        "sprite": action.new,
        "showsSprite": textbox.showsSprite
    };
}

function showSprite(textbox) {
    return {
        "header": textbox.header,
        "subheader": textbox.subheader,
        "flavorText": textbox.flavorText,
        "sprite": textbox.sprite,
        "showsSprite": true
    };
}

function hideSprite(textbox) {
    return {
        "header": textbox.header,
        "subheader": textbox.subheader,
        "flavorText": textbox.flavorText,
        "sprite": textbox.sprite,
        "showsSprite": false
    };
}

function reset(textbox) {
    return {
        "header": textbox.header,
        "subheader": "",
        "flavorText": textbox.flavorText,
        "sprite": textbox.sprite,
        "showsSprite": false
    };
}