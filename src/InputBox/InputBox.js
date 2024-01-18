import { useState } from 'react';

import './InputBox.css';

import { castLine, reelIn } from '../0scripts/FishingScript';

function InputBox({gdisplayDispatch, inventoryDispatch, setFlavor, location, setLocation}) {

  let [inputMode, setInputMode] = useState("at-water");

  return (
    <div className="rounded noselect input-body">
      {inputMode === "at-water" && 
      <> 
        <button className="act-button" onClick={()=> {castLine(gdisplayDispatch, setFlavor);}}>cast a line</button>
        <button className="act-button" onClick={()=> {}} >shop</button>
        <button className="act-button" onClick={()=> {}} >travel</button>
      </>}
      {inputMode === "fishing" && 
      <> 
        <button className="act-button" onClick={()=> {reelIn(inventoryDispatch); setInputMode("continue");}} >reel in</button>
      </>}
      {inputMode === "continue" && 
      <> 
        <button className="act-button" onClick={()=> {gdisplayDispatch({"type": "clearDisplay"}); setInputMode("at-water")}}>continue fishing</button>
      </>}
      
    </div>
  );
}

export default InputBox;
