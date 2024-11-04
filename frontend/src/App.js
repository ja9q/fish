import { useState, useEffect, useReducer } from 'react';
import { useCookies } from 'react-cookie';

import './App.css';

import { changeLocation } from './0scripts/GeneralScript.js';
import { initScriptImports, updateImports } from './0scripts/ScriptImports.js';
import { displayLocation } from './0scripts/TextBoxScript.js';

import { inventoryReducer, initialInventory } from './0reducers/InventoryReducer.js';
import { gdisplayReducer, initialGDisplay } from './0reducers/GameDisplayReducer.js';
import { textboxReducer } from './0reducers/TextBoxReducer.js';
import { recordReducer, initialRecord } from './0reducers/RecordReducer.js';
import { qteReducer, initialQTE } from './0reducers/QTEReducer';

import Header from "./Header/Header.js";
import ActionLog from "./ActionLog/ActionLog.js";
import DisplayBox from "./DisplayBox/DisplayBox.js";
import About from "./NonGame/About.js";
import Records from "./NonGame/Records.js";
import Settings from "./NonGame/Settings.js";
import Login from "./NonGame/Login.js";
import Inventory from "./Inventory/Inventory.js";
import TextBox from "./TextBox/TextBox.js";
import InputBox from "./InputBox/InputBox.js";



function App() {

  const [cookies, setCookie, removeCookie] = useCookies(['cookie-name']);

  let locations = require('./0data/locations.json').locations;

  const [isLoaded, setLoaded] = useState(false);

  const [displayMode, setDisplay] = useState(0);
  const [location, setLocation] = useState(locations[1]);
  const [inputMode, setInputMode] = useState("at-water");
  const [atShop, setShop] = useState(false);
  const [atTravel, setTravel] = useState(false);
  const [newLine, setLine] = useState(false);
  const [log, setLog] = useState([<li></li>,<li></li>,<li></li>,<li></li>,<li></li>,<li></li>,<li></li>]);
  const [wallet, setWallet] = useState(0.00);
  const [volume, setVolume] = useState(0.8);

  const [inventory, inventoryDispatch] = useReducer(inventoryReducer, initialInventory);
  const [gdisplay, gdisplayDispatch] = useReducer(gdisplayReducer, initialGDisplay);
  const [textbox, textboxDispatch] = useReducer(textboxReducer, {
    "header": locations[1].name,
    "subheader": "",
    "flavorText": locations[1].flavor,
    "sprite": {},
    "showsSprite": false});
  const [qte, qteDispatch] = useReducer(qteReducer, initialQTE);

  const [records, recordsDispatch] = useReducer(recordReducer, initialRecord);
  
  function addLine(l) {
    const temp = log;
    temp.push(<li>{l}</li>);
    temp.shift();
    setLog(temp);
    // force a re-render
    setLine(!newLine);
  }

  function loadCookies() {
    inventoryDispatch({"type": "set", "inventory": cookies["inventory"]});
    setWallet(cookies["wallet"]);
    recordsDispatch({"type": "set", "records": cookies["record"]});
    changeLocation(location.id, true);
    setVolume(cookies["volume"]);
  }

  function updateCookies() {
    setCookie("inventory", inventory);
    setCookie("wallet", wallet);
    setCookie("location", location);
    setCookie("volume", volume);
    setCookie("record", records);
  }

  useEffect(() => {
    initScriptImports(inventory, inventoryDispatch, gdisplayDispatch, location, setLocation, textboxDispatch, setInputMode, addLine, atShop, wallet, setWallet, recordsDispatch, volume);

    if (cookies["inventory"]) {
      loadCookies();
      addLine("welcome back to the fishing game!");
    } else {
      updateCookies();
      addLine("welcome to the fishing game!");
    }

    setLoaded(true);
  }, []);

  useEffect(() => {
    updateCookies();
    updateImports(inventory, wallet, location, atShop, volume);
  }, [inventory, wallet, location, atShop, volume]);

  useEffect(() => {
    displayLocation();
  }, [atShop]);

  return (
    <div className="App">
      {isLoaded && <>
      <Header setDisplay={setDisplay}  volume={volume} />

      <div className='page-body'>

        <div className='textstuff section'>
          <TextBox location={location.locationName} textbox={textbox} />
          <ActionLog log={log} />
        </div>

        <div className='gamestuff section'>
        {(displayMode === 0) && <>
          <div className='gamestack'>
            <DisplayBox gdisplay={gdisplay} atShop={atShop} shop={location.shop} wallet={wallet} atTravel={atTravel} qte={qte} qteDispatch={qteDispatch} location={location} volume={volume} />
            <InputBox inputMode={inputMode} setInputMode={setInputMode} gdisplayDispatch={gdisplayDispatch} location={location} setShop={setShop} setTravel={setTravel} volume={volume}/>
          </div>
          <Inventory inventory={inventory} atShop={atShop} wallet={wallet} />
          </>
          }
          {displayMode === 1 && <Records records={records} />}
          {displayMode === 2 && <About/>}
          {displayMode === 3 && <Settings volume={volume} setVolume={setVolume} removeCookie={removeCookie} />}
          {displayMode === 4 && <Login  setDisplay={setDisplay} />}
        </div>
      </div>
    </>}
    </div>
  );
}

export default App;
