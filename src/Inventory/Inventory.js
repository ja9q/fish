import './Inventory.css';

function InvenSection(props) {
  return(
    <div className='inven-section'>
          <strong>{props.sectionName}</strong>
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
  