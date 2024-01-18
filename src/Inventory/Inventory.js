import './Inventory.css';

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
  