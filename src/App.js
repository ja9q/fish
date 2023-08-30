import { useState } from 'react';

import './App.css';

import Header from "./Header/Header.js";
import ActionLog from "./ActionLog/ActionLog.js";
import DisplayBox from "./DisplayBox/DisplayBox.js";
import Inventory from "./Inventory/Inventory.js";
import TextBox from "./TextBox/TextBox.js";
import InputBox from "./InputBox/InputBox.js";

function App() {

  const [displayMode, setDisplay] = useState(0);
  const [dayNumber, setDay] = useState(0);

  function incDay() {
    setDay(dayNumber+1);
  }

  return (
    <div className="App">

      <Header setDisplay={setDisplay} />

      <div className='page-body'>

        <div className='textstuff section'>
          <TextBox dayNumber={dayNumber} />
          <ActionLog />
        </div>

        <div className='gamestuff section'>
          <div className='gamestack'>
            <DisplayBox displayMode={displayMode} />
            <InputBox />
          </div>
          <Inventory />
        </div>
        
      </div>

    </div>
  );
}

export default App;
