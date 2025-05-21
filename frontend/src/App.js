import { useState, useEffect, useReducer } from 'react';
import { useCookies } from 'react-cookie';

import axios from 'axios';

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
  const [username, setUsername] = useState('');

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

  async function saveUserData() {
    console.log(username, cookies['username']);
    if (username+cookies["username"] !== '') {
      console.log('attempting save...');

      // convert the current inventory/record into strings for the database
      let inventoryString = [];
      const temp = inventory.map((item) => {
        inventoryString.push(JSON.stringify(item))
        return JSON.stringify(item)});
      inventoryString = inventoryString.toString();

      const recordsString = JSON.stringify(records);

      console.log(username, inventoryString, wallet, recordsString)

      try {
        // attempt save
        const response = await axios.patch('http://localhost:8080/api/user/save', { username, inventoryString, wallet, recordsString }, {withCredentials: true});
        console.log('save success: '+ JSON.stringify(response.data))
      } catch (error) {
          console.error('Save failed:', error.response ? error.response.data : error.message);
      }

      
    }
  }

  function loadUserData(data) {
    // convert the strings of the userdata into JSON data
    setCookie("username", data["username"])

    addLine("logged in: " + data["username"]);

    const inventoryData = [];
    const invenDataTemp = data["inventory"].split('},');
    invenDataTemp.forEach((item) => {
      item += (item[item.length-1] !== '}') ? '}' : '';
      inventoryData.push(JSON.parse(item));
    });

    const recordsData = JSON.parse(data["record"]);

    setShop(false);
    changeLocation(1, true);

    setUsername(data["username"])
    inventoryDispatch({"type": "set", "inventory": inventoryData});
    setWallet(data["wallet"]);
    recordsDispatch({"type": "set", "records": recordsData});
  }

  function loadCookies() {
    console.log('loading cookies');

    inventoryDispatch({"type": "set", "inventory": cookies["inventory"]});
    setWallet(cookies["wallet"]);
    recordsDispatch({"type": "set", "records": cookies["record"]});
    changeLocation(location.id, true);
    setVolume(cookies["volume"]);
    setUsername(cookies["username"]);
  }

  function updateCookies() {
    setCookie("inventory", inventory);
    setCookie("wallet", wallet);
    setCookie("location", location);
    setCookie("volume", volume);
    setCookie("record", records);
  }

  function resetCookies() {
    removeCookie("inventory");
    removeCookie("wallet");
    removeCookie("location");
    removeCookie("volume");
    removeCookie("record");
    window.location.reload();
  }

  async function logOut() {
    addLine("logged out: " + username);
    setUsername('');
      setCookie("username", "")
    try {
      // attempt save
      const response = await axios.post('http://localhost:8080/api/auth/logout', {}, {withCredentials: true});
      console.log('logout success');
    } catch (error) {
        console.error('logout failed:', error.response ? error.response.data : error.message);
    }
    resetCookies();
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

    const interval = setInterval(() => {
      console.log('a minute has passed; username = '+ cookies["username"]);
      if (cookies["username"] !== '') {
        console.log('running saveUserData');
        saveUserData();
        addLine('autosaving game...')
      }      
    }, 60000);

    return () => clearInterval(interval);
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
      <Header setDisplay={setDisplay}  volume={volume} username={username} logOut={logOut} />

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
          {displayMode === 3 && <Settings volume={volume} setVolume={setVolume} resetCookies={resetCookies} saveUserData={saveUserData} addLine={addLine} />}
          {displayMode === 4 && <Login  setDisplay={setDisplay} inventory={inventory} wallet={wallet} records={records} loadUserData={loadUserData} setUser={setUsername} />}
        </div>
      </div>
    </>}
    </div>
  );
}

export default App;
