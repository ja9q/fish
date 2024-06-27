import { useState } from 'react';

import { fish } from '../0scripts/GeneralScript';

import { displayItem, displayLocation } from '../0scripts/TextBoxScript';

import { sprites } from '../0scripts/GeneralScript';

function Records({records}) {

  const [curSprite, setSprite] = useState("");
  const [curAlt, setAlt] = useState("");

  let species = [];

  records.caughtSpecies.forEach((element, i) => {
    if (i > 0 && element > 0) {

      species.push(<li><em onMouseEnter={() => {displayItem(fish[i]); setSprite(fish[i].image.image); setAlt(fish[i].image.alt)}}
        onMouseLeave={() => {displayLocation(); setSprite(""); setAlt("")}}>{fish[i].name}</em>: {element}</li>);
    }    

  });

    return (
      <div className="nongame rounded noselect rel">
        <h2>records</h2>
        <div>
          <p style={{marginTop:"10px"}}><strong>Fish Caught</strong>: {records.caughtFish}</p>
          <ul className="list" >
            {species}
          </ul>
          <p className="line-spaced"><strong>Total Bites</strong>: {records.totalBites} <em> (Failed/Trash Catches: {records.totalBites-records.caughtFish})</em></p>
         </div>
         <img draggable={false} className='pixel big-sprite' src={sprites[curSprite]} alt={curAlt}/>
      </div>
    );
  }
  
  export default Records;