export function inventoryReducer(inventory, action) {
switch (action.type) {
    case 'add': {
        return addItem(inventory, action);
    }
    case 'remove': {
        return removeItem(inventory, action);
    }
    case 'equip': {
        return equipItem(inventory, action);
    }
    default: {
        throw Error('Unknown action: ' + action.type);
    }
}
}

export const initialInventory = [
    { type:"rod", id: 1, count: 1, equipped: true },
    { type:"bait", id: 1, count: 10, equipped: true }
];
    

function addItem(inventory, action) {
    let newItem = true;
    let temp =  inventory.map(t => {
        if (action.item.type === t.type && t.id === action.item.id) {
            newItem = false;
            t.count += action.count;
            return t;
        } else {
            return t;
        }
    });
    if (newItem){
        return [...inventory, {
            type: action.item.type,
            id: action.item.id,
            count: action.count,
            equipped: false
        }]
    } else {
        return temp;
    }
    
}

function removeItem(inventory, action) {
    let temp = inventory.map(t => {
        if (t.type === action.item.type && t.id === action.item.id) {
            t.count -= action.count;
            return t;
        } else {
            return t;
        }
    });
    return temp.filter(t => (t.count > 0));
}

function equipItem(inventory, action) {
    inventory = inventory.map(t => {
        if(t.type === action.item.type && t.type !== "fish"){
            t.equipped = false;
        }
        return t;
    });

    return inventory.map(t => {
        if(t.id === action.item.id && t.type !== "fish"){
            t.equipped = true;
        }
        return t;
    });
}