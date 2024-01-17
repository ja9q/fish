import './InputBox.css';

import { useGDisplayDispatch } from "../0contexts/GameDisplayContext";
import { useInventoryDispatch } from "../0contexts/InventoryContext";
import { castLine } from '../0scripts/FishingScript';

function InputBox(props) {

    const gdisplayDispatch = useGDisplayDispatch();
    const inventoryDispatch = useInventoryDispatch();

    return (
      <div className="rounded noselect input-body">
        {props.inputMode === "at-water" && 
        <> 
          <button className="act-button" onClick={()=> {castLine(gdisplayDispatch)}}>cast a line</button>
          <button className="act-button" onClick={()=> {}} >shop</button>
          <button className="act-button" onClick={()=> {}} >travel</button>
        </>}
        {props.inputMode === "fishing" && 
        <> 
          <button className="act-button" onClick={()=> {props.reelIn();}} >reel in</button>
        </>}
        {props.inputMode === "continue" && 
        <> 
          <button className="act-button" onClick={()=> {props.clearDisplay(); props.setInput("at-water")}}>continue fishing</button>
        </>}
        
      </div>
    );
  }
  
  export default InputBox;
  