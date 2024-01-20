import './InputBox.css';

import { castLine, reelIn } from '../0scripts/FishingScript';
import { displayLocation } from '../0scripts/TextBoxScript';

function InputBox({inputMode, setInputMode, gdisplayDispatch, setShop}) {

  

  return (
    <div className="rounded noselect input-body">
      {inputMode === "at-water" && 
      <> 
        <button className="act-button" onClick={()=> {castLine(); setInputMode("fishing")}}>cast a line</button>
        <button className="act-button" onClick={()=> {setShop(true); setInputMode("at-shop")}} >shop</button>
        <button className="act-button" onClick={()=> {}} >travel</button>
      </>}
      {inputMode === "fishing" && 
      <> 
        <button className="act-button" onClick={()=> {reelIn(); setInputMode("continue");}} >reel in</button>
      </>}
      {inputMode === "continue" && 
      <> 
        <button className="act-button" onClick={()=> {gdisplayDispatch({"type": "clearDisplay"}); setInputMode("at-water"); displayLocation()}}>continue fishing</button>
      </>}
      {inputMode === "at-shop" && 
      <> 
        <button className="act-button" onClick={()=> {setShop(false); setInputMode("at-water");}}>exit shop</button>
      </>}
      
    </div>
  );
}

export default InputBox;
