import { useState, useEffect } from 'react';

import './Inventory.css';

import { displayItem, displayLocation } from '../0scripts/TextBoxScript';
import { getItem, sellItem, equipItem } from '../0scripts/InventoryScript';

function Item({item, atShop}) {

  const [mouseOver, setMouseOver] = useState(false);

  const i = getItem(item);

  return(
    <span className={(item.type === "fish" && atShop) ? 'inven-item sellable' : 'inven-item'} onClick={() => {if (item.type === "fish" && atShop) {sellItem(item, i.price)}}}  onMouseOver={() => {displayItem(i); setMouseOver(true)}} onMouseLeave={() => {displayLocation(); setMouseOver(false)}}>
      <span>{i.name}{item.equipped && <> (E)</>}{item.type !== 'rod' && <> - {item.count}</>}</span>
      {item.type === "fish" && atShop && <span>${i.price.toFixed(2)}</span>}
      {item.equipped && <> (E)</>}
      {(!item.equipped && item.type !== "fish" && item.type !== "other" && mouseOver) && 
      <span className='equip-button' onClick={() => {equipItem(item)}}>Equip</span> }
    </span> 
  );
}

function InvenSection({sectionName, items, atShop}) {
  const equippedItems = items.map(item => {
    if (item.equipped)
     return <Item item={item} atShop={atShop} />
  });

  const itemList = items.map(item => {
    if (!item.equipped)
     return <Item item={item} atShop={atShop} />
  });
  return(

      <div className='inven-section'>
        
          <strong>{sectionName}</strong> <br/>
          {sectionName === "Gear" && equippedItems}
          {itemList}
        
    </div>
  );
}



function Inventory({inventory, atShop, wallet}) {

  const [sortedInventory, setSorted] = useState({"gear": [], "fish": [], "misc": []});

  useEffect(() => {
    const temp = {"gear": [], "fish": [], "misc": []}
    inventory.forEach(item => {
      switch (item.type) {
        case 'fish':
          temp.fish.push(item);
          break;
        case 'rod':
          temp.gear.push(item);
          break;
        case 'bait':
          temp.gear.push(item);
          break;
        default:
          temp.misc.push(item);
          break;
      }
      setSorted(temp)
    })}, [inventory])

    return (
      <div className="rounded noselect inventory-body">
        <span className='inventory-top'><h2>Inventory </h2>${wallet.toFixed(2)}</span>
        <InvenSection sectionName={"Gear"} items={sortedInventory.gear} atShop={atShop} />
        {sortedInventory.fish.length > 0 && <InvenSection sectionName={"Fish"} items={sortedInventory.fish} atShop={atShop} />}
        {sortedInventory.misc.length > 0 && <InvenSection sectionName={"Misc"} items={sortedInventory.misc} atShop={atShop} />}
      </div>
    );
  }
  
  export default Inventory;
  