import { useState, useEffect } from 'react';

import './App.css';

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
  const [dayNumber, setDay] = useState(0);
  const [location, setLocation] = useState("");
  const [flavorText, setFlavor] = useState("");
  const [visual, setVisual] = useState({image: "", alt: ""});
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
  }, []);

  function incDay() {
    setDay(dayNumber+1);
    addLine("started day "+dayNumber+"!");
  }

  function changeLocation(loc) {
    setLocation(locations[loc].locationName);
    setVisual({image: locations[loc].locationImage, alt: locations[loc].locationImageAlt});
    if (loc !== 0)
      addLine("travelled to "+locations[loc].locationName+".");
    setFlavor(<p>{locations[loc].locationFlavor}</p>);
  }

  useEffect(() => {
    changeLocation(0);
  }, []);

  return (
    <div className="App">

      <Header setDisplay={setDisplay} />

      <div className='page-body'>

        <div className='textstuff section'>
          <TextBox dayNumber={dayNumber} location={location} flavorText={flavorText} />
          <ActionLog log={log} />
        </div>

        <div className='gamestuff section'>
        {displayMode === 0 && <>
          <div className='gamestack'>
            <DisplayBox visual={visual} />
            <InputBox  changeLocation={changeLocation} />
          </div>
          <Inventory/>
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
