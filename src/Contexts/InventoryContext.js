import { createContext, useContext, useReducer } from 'react';

export const InventoryContext = createContext(null);
export const InventoryDispatchContext = createContext(null);

export function useInventory() {
    return useContext(InventoryContext);
}

export function useInventoryDispatch() {
    return useContext(InventoryDispatchContext);
}

export function InventoryProvider({ children }) {
  const [inventory, dispatch] = useReducer(
    inventoryReducer,
    initialInventory
  );

  return (
    <InventoryContext.Provider value={inventory}>
      <InventoryDispatchContext.Provider value={dispatch}>
        {children}
      </InventoryDispatchContext.Provider>
    </InventoryContext.Provider>
  );
}

function addItem(inventory, action) {
    let temp =  inventory.map(t => {
        if (t.id === action.item.id) {
            t.count += action.count;
            return t;
        } else {
            return t;
        }
    });
    if (temp === inventory){
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
        if (t.id === action.item.id) {
            t.count -= action.count;
            return (t.count <= 0) 
        } else {
            return t;
        }
    });
    return temp.filter(t => (t.count > 0 && (t.type !== "equipment" && t.id !== 2)));
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

function inventoryReducer(inventory, action) {
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

const initialInventory = [
    { type:"rod", id: 1, count: 1, equipped: true },
    { type:"bait", id: 1, count: 1, equipped: true }
];
