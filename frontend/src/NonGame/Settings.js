import { useState } from "react";

import './Nongame.css';

function Settings({volume, setVolume, resetCookies, saveUserData, addLine}) {

    const [resetWarning, setResetWarn] = useState(false);

    

    return (
      <div className="nongame rounded noselect">
        <h2>settings</h2>
        <div>
          <br/>
          volume:
          <input type="range" min="0" max="100" step="1" defaultValue={volume*100.0} onChange={e => setVolume(e.target.value/100.0)} />
           {(volume*100.0).toFixed(0)}%
        </div>
        <br/>
        <div>
          <button className="settings-button" onClick={() => {saveUserData(); addLine('saved game!')}}>Save Game</button>
        </div>
        <br/>
        <div>
          <button className="settings-button warning-button" onClick={() => {setResetWarn(!resetWarning)}}>Reset Game</button>
        </div>
        {resetWarning &&
        <div className="warning-block">
          <p className="line-spaced">
            After resetting your game, there will be no way to restore your lost data! <br/>
            Are you sure you want to reset your game?
          </p>
          <span >
            <button className="settings-button warning-button" onClick={() => {resetCookies()}}>Yes</button>
            <button className="settings-button" onClick={() => {setResetWarn(false)}}>No</button>
          </span>
        </div>}

      </div>
    );
  }
  
  export default Settings;
  