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
  let fishes = require('./0data/fish.json').fish;

  const [displayMode, setDisplay] = useState(0);
  const [dayNumber, setDay] = useState(0);
  const [location, setLocation] = useState({});
  const [flavorText, setFlavor] = useState("");
  const [visual, setVisual] = useState({});
  const [overlay, setOverlay] = useState({});
  const [displayFish, setDisplayFish] = useState({});
  const [isDisplayFish, setFishOnDisplay] = useState(false);
  const [newLine, setLine] = useState(false);
  const [log, setLog] = useState([<li></li>,<li></li>,<li></li>,<li></li>,<li></li>,<li></li>]);
  const [inputMode, setInput] = useState("new-day");
  const [fishBite, setBite] = useState(false);
  const [timerId, setTimer] = useState(0);

  function addLine(l) {
    const temp = log;
    temp.push(<li>{l}</li>);
    temp.shift();
    setLog(temp);
    setLine(!newLine);
  }

  useEffect(() => {
    addLine("welcome to the fishing game!");
    setOverlay({"isShowing": false});
  }, []);

  function incDay() {
    setDay(dayNumber+1);
    addLine("started day "+dayNumber+"!");
  }

  function changeFlavor(t) {
    setFlavor(<p>{t}</p>);
  }

  function changeLocation(loc) {
    setOverlay({"isShowing": false});
    setDisplayFish(false);
    setLocation(locations[loc]);
    setVisual({image: locations[loc].locationImage, alt: locations[loc].locationImageAlt});
    if (loc !== 1 && loc !== location.locationId)
      addLine("travelled to "+locations[loc].locationName+".");
    changeFlavor(locations[loc].locationFlavor);
  }

  function biteEvent() {
    setOverlay({"isShowing": true, "image": "linebite", "alt": "your bob moved because a fish bit it!"});
    changeFlavor("you got a bite!!");
    setBite(true);
    setTimer(setTimeout(() => {setBite(false); changeFlavor("the fish got away..."); setInput("continue");}, 2000));
  }

  function castLine() {
    const waitTime = Math.floor(((Math.random() * location.fishWait) + 2) * 1000);
    setOverlay({"isShowing": true, "image": "linewaiting", "alt": "your bob is floating in the water."});
    changeFlavor("you're waiting for a bite...");
    setTimer(setTimeout(biteEvent, waitTime));
  }


  function reelIn() {
    setOverlay({"isShowing": false});
    if(fishBite){
      clearTimeout(timerId);
      const fishGacha = Math.random();
      let caughtFish = 0;
      location.locationFish.forEach(f => {
        if (f.chance > fishGacha){
          caughtFish = f.fish;
        }
      });
      setDisplayFish(fishes[caughtFish]);
      setFishOnDisplay(true);
      changeFlavor("you reeled in a "+fishes[caughtFish].name+"!");
      setInput("continue");
      setBite(false);
    } else {
      clearTimeout(timerId);
      setInput("continue");
      changeFlavor("you reeled in too quickly! you have no fish...");
    }
  }


  useEffect(() => {
    changeLocation(1);
  }, []);

  return (
    <div className="App">

      <Header setDisplay={setDisplay} />

      <div className='page-body'>

        <div className='textstuff section'>
          <TextBox dayNumber={dayNumber} location={location.locationName} flavorText={flavorText} />
          <ActionLog log={log} />
        </div>

        <div className='gamestuff section'>
        {displayMode === 0 && <>
          <div className='gamestack'>
            <DisplayBox visual={visual} overlay={overlay} hasFish={isDisplayFish} fish={displayFish}  />
            <InputBox  changeLocation={changeLocation} inputMode={inputMode} setInput={setInput} castLine={castLine} reelIn={reelIn} />
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
