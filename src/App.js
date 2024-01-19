import { useState, useEffect, useReducer } from 'react';

import './App.css';

import { initScriptImports } from './0scripts/ScriptImports.js';

import { inventoryReducer, initialInventory } from './0reducers/InventoryReducer.js';
import { gdisplayReducer, initialGDisplay } from './0reducers/GameDisplayReducer.js';
import { textboxReducer } from './0reducers/TextBoxReducer.js';

import Header from "./Header/Header.js";
import ActionLog from "./ActionLog/ActionLog.js";
import DisplayBox from "./DisplayBox/DisplayBox.js";
import About from "./NonGame/About.js";
import Records from "./NonGame/Records.js";
import Settings from "./NonGame/Settings.js";
import Inventory from "./Inventory/Inventory.js";
import TextBox from "./TextBox/TextBox.js";
import InputBox from "./InputBox/InputBox.js";



function App() {

  let locations = require('./0data/locations.json').locations;

  const [displayMode, setDisplay] = useState(0);
  const [location, setLocation] = useState(locations[1]);
  const [inputMode, setInputMode] = useState("at-water");
  const [newLine, setLine] = useState(false);
  const [log, setLog] = useState([<li></li>,<li></li>,<li></li>,<li></li>,<li></li>,<li></li>]);
  

  const [inventory, inventoryDispatch] = useReducer(inventoryReducer, initialInventory);
  const [gdisplay, gdisplayDispatch] = useReducer(gdisplayReducer, initialGDisplay);
  const [textbox, textboxDispatch] = useReducer(textboxReducer, {
    "header": locations[1].name,
    "subheader": "",
    "flavorText": locations[1].flavor,
    "sprite": {},
    "showsSprite": false});
  
  function addLine(l) {
    const temp = log;
    temp.push(<li>{l}</li>);
    temp.shift();
    setLog(temp);
    // force a re-render
    setLine(!newLine);
  }

  initScriptImports(inventory, inventoryDispatch, gdisplay, gdisplayDispatch, location, setLocation, textboxDispatch, setInputMode, addLine);

  useEffect(() => {
    addLine("welcome to the fishing game!");
  }, []);

  return (
    <div className="App">

      <Header setDisplay={setDisplay} />

      <div className='page-body'>

        <div className='textstuff section'>
          <TextBox location={location.locationName} textbox={textbox} />
          <ActionLog log={log} />
        </div>

        <div className='gamestuff section'>
        {displayMode === 0 && <>
          <div className='gamestack'>
            <DisplayBox gdisplay={gdisplay} />
            <InputBox inputMode={inputMode} setInputMode={setInputMode} gdisplayDispatch={gdisplayDispatch} location={location} />
          </div>
          <Inventory inventory={inventory} inventoryDispatch={inventoryDispatch} />
          </>
          }
          {displayMode === 1 && <Records/>}
          {displayMode === 2 && <About/>}
          {displayMode === 3 && <Settings/>}
        </div>
      </div>

    </div>
  );
}

export default App;
