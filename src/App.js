import { useState, useEffect, useReducer } from 'react';

import './App.css';

import { inventoryReducer, initialInventory } from './0reducers/InventoryReducer.js';
import { gdisplayReducer, initialGDisplay } from './0reducers/GameDisplayReducer.js';

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
  
  const [inventory, inventoryDispatch] = useReducer(inventoryReducer, initialInventory);
  const [gdisplay, gdisplayDispatch] = useReducer(gdisplayReducer, initialGDisplay);

  const [displayMode, setDisplay] = useState(0);
  const [location, setLocation] = useState({});
  const [flavorText, setFlavor] = useState("");
  const [newLine, setLine] = useState(false);
  const [log, setLog] = useState([<li></li>,<li></li>,<li></li>,<li></li>,<li></li>,<li></li>]);
  

  function addLine(l) {
    const temp = log;
    temp.push(<li>{l}</li>);
    temp.shift();
    setLog(temp);
    setLine(!newLine);
  }

  useEffect(() => {
    addLine("welcome to the fishing game!");
    // setOverlay({"isShowing": false});
  }, []);

  function changeFlavor(t) {
    setFlavor(<p>{t}</p>);
  }

  // function changeLocation(loc) {
  //   clearDisplay();
  //   setLocation(locations[loc]);
  //   setVisual({image: locations[loc].locationImage, alt: locations[loc].locationImageAlt});
  //   if (loc !== 1 && loc !== location.locationId)
  //     addLine("travelled to "+locations[loc].locationName+".");
  //   changeFlavor(locations[loc].locationFlavor);
  // }

  return (
    <div className="App">

      <Header setDisplay={setDisplay} />

      <div className='page-body'>

        <div className='textstuff section'>
          <TextBox location={location.locationName} flavorText={flavorText} />
          <ActionLog log={log} />
        </div>

        <div className='gamestuff section'>
        {displayMode === 0 && <>
          <div className='gamestack'>
            <DisplayBox gdisplay={gdisplay} />
            <InputBox gdisplayDispatch={gdisplayDispatch} inventoryDispatch={initialInventory} setFlavor={setFlavor} location={location} setLocation={setLocation} />
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
