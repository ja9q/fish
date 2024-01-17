import './Inventory.css';

import { useInventory } from '../0contexts/InventoryContext';
import { useInventoryDispatch } from '../0contexts/InventoryContext';

let bait = require('../0data/bait.json').baits;
let rod = require('../0data/rod.json').rods;
let fish = require('../0data/fish.json').fish;

function Item({item}) {
  return(
    <span className='inven-item' >
      <span>{eval(item.type+"["+item.id+"]."+"name")}</span>

      <span>x</span>
    </span> 
  );
}

function InvenSection(props) {
  const inventory = useInventory();
  const itemList = inventory.map(item => {
    if ((props.sectionName === "Gear" && item.type !== "fish") || (props.sectionName === "Fish" && item.type === "fish"))
     return <Item item={item}/>
  });
  return(
    <div className='inven-section'>
          <strong>{props.sectionName}</strong> <br/>
          {itemList}
    </div>
  );
}

function Inventory() {
    return (
      <div className="rounded noselect inventory-body">
        <h2>Inventory</h2>
        <InvenSection sectionName={"Gear"}/>
        <InvenSection sectionName={"Fish"}/>
        
      </div>
    );
  }
  
  export default Inventory;
  