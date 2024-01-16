import { useState } from 'react';
import './InputBox.css';

function InputBox(props) {

    return (
      <div className="rounded noselect input-body">
        {props.inputMode === "at-water" && 
        <> 
          <button className="act-button" onClick={()=> {props.castLine(); props.setInput("fishing")}} >cast a line</button>
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
  