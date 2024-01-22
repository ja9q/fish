import useSound from 'use-sound';

import './InputBox.css';
import click01 from '../0assets/sfx/click_01.mp3'

import { castLine, reelIn } from '../0scripts/FishingScript';
import { displayLocation } from '../0scripts/TextBoxScript';



function InputBox({inputMode, setInputMode, gdisplayDispatch, setShop}) {

  const [sfx_click01] = useSound(click01);

  return (
    <div className="rounded noselect input-body">
      {inputMode === "at-water" && 
      <> 
        <button className="act-button" onClick={() => {sfx_click01(); castLine()}}>cast a line</button>
        <button className="act-button" onClick={()=> {sfx_click01(); setShop(true); setInputMode("at-shop")}} >shop</button>
        <button className="act-button" onClick={()=> {sfx_click01(); }} >travel</button>
      </>}
      {inputMode === "fishing" && 
      <> 
        <button className="act-button" onClick={()=> {sfx_click01(); reelIn(); setInputMode("continue");}} >reel in</button>
      </>}
      {inputMode === "continue" && 
      <> 
        <button className="act-button" onClick={()=> {sfx_click01(); gdisplayDispatch({"type": "clearDisplay"}); setInputMode("at-water"); displayLocation()}}>continue fishing</button>
      </>}
      {inputMode === "at-shop" && 
      <> 
        <button className="act-button" onClick={()=> {sfx_click01(); setShop(false); setInputMode("at-water");}}>exit shop</button>
      </>}
      
    </div>
  );
}

export default InputBox;
