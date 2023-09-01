import { useState } from 'react';
import './InputBox.css';

function InputBox(props) {

  const [inputMode, setInput] = useState(0);

    return (
      <div className="rounded noselect input-body">
        {inputMode === 0 && // 0 = wake-up
        <> 
          <button className="act-button" onClick={()=> {props.changeLocation(1); setInput(1)}} >go fishing</button>
        </>}
        {inputMode === 1 && // 1 = go fish
        <> 
          <button className="act-button" onClick={()=> {props.changeLocation(1);}} >cast a line</button>
        </>}
        
      </div>
    );
  }
  
  export default InputBox;
  