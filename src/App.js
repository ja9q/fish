import { useState, useEffect } from 'react';

import './App.css';

import { GameContext } from './0contexts/ContextPack.js';

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
  const [location, setLocation] = useState({});
  const [flavorText, setFlavor] = useState("");
  const [newLine, setLine] = useState(false);
  const [log, setLog] = useState([<li></li>,<li></li>,<li></li>,<li></li>,<li></li>,<li></li>]);
  const [inputMode, setInput] = useState("at-water");
  

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


  


  useEffect(() => {
    
  }, []);

  return (
    <div className="App">

      <Header setDisplay={setDisplay} />

      <div className='page-body'>

        <div className='textstuff section'>
          <TextBox location={location.locationName} flavorText={flavorText} />
          <ActionLog log={log} />
        </div>

        <GameContext>
        <div className='gamestuff section'>
        {displayMode === 0 && <>
          <div className='gamestack'>
            <DisplayBox />
            <InputBox  inputMode={inputMode} setInput={setInput}  />
          </div>
          <Inventory/>
          </>
          }
          {displayMode === 1 && <Records/>}
          {displayMode === 2 && <About/>}
          {displayMode === 3 && <Settings/>}
        </div>
        </GameContext>
      </div>

    </div>
  );
}

export default App;
