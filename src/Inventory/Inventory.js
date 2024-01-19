import './Inventory.css';

import { displayItem, displayLocation } from '../0scripts/TextBoxScript';

let bait = require('../0data/bait.json').baits;
let rod = require('../0data/rod.json').rods;
let fish = require('../0data/fish.json').fish;

function Item({item}) {

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
    <span className='inven-item'  onMouseOver={() => {displayItem(i)}} onMouseLeave={displayLocation}>
      <span>{i.name}{item.equipped && <> (E)</>}{item.type !== 'rod' && <> - {item.count}</>}</span>
      <span>x</span>
    </span> 
  );
}

function InvenSection({sectionName, inventory, inventoryDispatch}) {
  const itemList = inventory.map(item => {
    if ((sectionName === "Gear" && item.type !== "fish") || (sectionName === "Fish" && item.type === "fish"))
     return <Item item={item}/>
  });
  return(
    <div className='inven-section'>
          <strong>{sectionName}</strong> <br/>
          {itemList}
    </div>
  );
}

function Inventory({inventory, inventoryDispatch}) {
    return (
      <div className="rounded noselect inventory-body">
        <h2>Inventory</h2>
        <InvenSection sectionName={"Gear"} inventory={inventory} inventoryDispatch={inventoryDispatch} />
        <InvenSection sectionName={"Fish"} inventory={inventory} inventoryDispatch={inventoryDispatch} />
        
      </div>
    );
  }
  
  export default Inventory;
  