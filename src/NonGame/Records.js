import { fish } from '../0scripts/GeneralScript';

import { getItem } from '../0scripts/InventoryScript';
import { displayItem, displayLocation } from '../0scripts/TextBoxScript';

function Records({records}) {


  let species = [];

  records.caughtSpecies.forEach((element, i) => {
    if (i > 0 && element > 0) {

      species.push(<li onMouseEnter={() => {displayItem(fish[i])}} onMouseLeave={displayLocation}><em>{fish[i].name}</em>: {element}</li>);
    }    

  });

    return (
      <div className="nongame rounded noselect">
        <h2>records</h2>
        <p style={{marginTop:"10px"}}><strong>Fish Caught</strong>: {records.caughtFish}</p>
        <ul className="list" >
          {species}
        </ul>
        <p className="line-spaced"><strong>Total Bites</strong>: {records.totalBites} <em> (Failed/Trash Catches: {records.totalBites-records.caughtFish})</em></p>
      </div>
    );
  }
  
  export default Records;