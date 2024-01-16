import './Inventory.css';

import { useInventory } from '../Contexts/InventoryContext';
import { useInventoryDispatch } from '../Contexts/InventoryContext';

let bait = require('../0data/bait.json').baits;
let rod = require('../0data/rod.json').rods;
let fish = require('../0data/fish.json').fish;

function Item({item}) {
  return(
    <span className='inven-item' >
      <span>{eval(item.type+"["+item.id+"]."+item.type+"Name")}</span>

      <span>a</span>
    </span> 
  );
}

function InvenSection(props) {
  const inventory = useInventory();
  const itemList = inventory.map(item => (
    <Item item={item}/>
  ));
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
      </div>
    );
  }
  
  export default Inventory;
  