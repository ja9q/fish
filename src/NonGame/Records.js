import { useEffect } from 'react';
import { fish } from '../0scripts/GeneralScript';

function Records({records}) {


  let species = [];
  records.caughtSpecies.forEach((element, i) => {
    if (i > 0 && element > 0) {
      species.push(<li><em>{fish[i].name}</em>: {element}</li>);
    }    

  });

    return (
      <div className="nongame rounded">
        <h2>records</h2>
        <p style={{marginTop:"10px"}}><strong>Fish Caught</strong>: {records.caughtFish}</p>
        <ul className="list" >
          {species}
        </ul>
        <p className="line-spaced"><strong>Total Bites</strong>: {records.totalBites} <em> (Failed Catches: {records.failedCatches})</em></p>
      </div>
    );
  }
  
  export default Records;
  