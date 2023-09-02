import { useState } from 'react';
import './InputBox.css';

function InputBox(props) {

    return (
      <div className="rounded noselect input-body">
        {props.inputMode === "new-day" && 
        <> 
          <button className="act-button" onClick={()=> {props.changeLocation(2); props.setInput("at-water")}} >go fishing</button>
        </>}
        {props.inputMode === "at-water" && 
        <> 
          <button className="act-button" onClick={()=> {props.castLine(); props.setInput("fishing")}} >cast a line</button>
        </>}
        {props.inputMode === "fishing" && 
        <> 
          <button className="act-button" onClick={()=> {props.reelIn();}} >reel in</button>
        </>}
        {props.inputMode === "continue" && 
        <> 
          <button className="act-button" onClick={()=> {props.changeLocation(2); props.setInput("at-water")}}>continue fishing</button>
        </>}
        
      </div>
    );
  }
  
  export default InputBox;
  