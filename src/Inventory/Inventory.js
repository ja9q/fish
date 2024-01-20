import './Inventory.css';

import { displayItem, displayLocation } from '../0scripts/TextBoxScript';
import { sellItem } from '../0scripts/InventoryScript';

let bait = require('../0data/bait.json').baits;
let rod = require('../0data/rod.json').rods;
let fish = require('../0data/fish.json').fish;

function Item({item, atShop, money}) {

  function getItem() {
    switch(item.type) {
      case 'bait':
        return bait[item.id];
      case 'rod':
        return rod[item.id];
      case 'fish':
        return fish[item.id];
      default:
        return "test";
    }
  }
  const i = getItem(item);

  return(
    <span className={(item.type === "fish" && atShop) ? 'inven-item sellable' : 'inven-item'} onClick={() => {if (item.type === "fish" && atShop) {sellItem(item, i.price)}}}  onMouseOver={() => {displayItem(i)}} onMouseLeave={displayLocation}>
      <span>{i.name}{item.equipped && <> (E)</>}{item.type !== 'rod' && <> - {item.count}</>}</span>
      {item.type === "fish" && atShop && <span>${i.price.toFixed(2)}</span>}
    </span> 
  );
}

function InvenSection({sectionName, inventory, atShop}) {
  const itemList = inventory.map(item => {
    if ((sectionName === "Gear" && item.type !== "fish") || (sectionName === "Fish" && item.type === "fish"))
     return <Item item={item} atShop={atShop} />
  });
  return(
    <div className='inven-section'>
          <strong>{sectionName}</strong> <br/>
          {itemList}
    </div>
  );
}

function Inventory({inventory, atShop, money}) {
    return (
      <div className="rounded noselect inventory-body">
        <span className='inventory-top'><h2>Inventory </h2>${money.toFixed(2)}</span>
        <InvenSection sectionName={"Gear"} inventory={inventory} atShop={atShop} />
        <InvenSection sectionName={"Fish"} inventory={inventory} atShop={atShop} />
        
      </div>
    );
  }
  
  export default Inventory;
  