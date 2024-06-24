function Settings({volume, setVolume}) {



    return (
      <div className="nongame rounded">
        <h2>settings</h2>
        <div>
          <br/>
          volume:
          <input type="range" min="0" max="100" step="1" defaultValue={volume*100.0} onChange={e => setVolume(e.target.value/100.0)} />
           {(volume*100.0).toFixed(0)}%
        </div>
        <div>
          
        </div>

      </div>
    );
  }
  
  export default Settings;
  