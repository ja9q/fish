import { useEffect, useState } from 'react';

import './ActionLog.css';



function ActionLog(props) {


    return (
      <div className='rounded log-body'>
        <div className='log-text'>
          <ul className='log'>
            {props.log}
          </ul>
        </div>
      </div>
    );
  }
  
  export default ActionLog;
  