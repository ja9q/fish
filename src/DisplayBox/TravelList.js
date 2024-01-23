import { getLocation } from '../0scripts/ScriptImports';
import { backgrounds, miscImg, changeLocation } from '../0scripts/GeneralScript';
import { displayLocation } from '../0scripts/TextBoxScript';
import { hasItem } from '../0scripts/InventoryScript';



import useSound from 'use-sound';

import './DisplayBox.css';

import click_light from '../0assets/sfx/click_light.mp3'
import click_01 from '../0assets/sfx/click_01.mp3'

function TravelOption({location}) {
    const [sfx_lightclick] = useSound(click_light)
    const [sfx_click01] = useSound(click_01)
    const isHere = ((location+1) === getLocation().id)
    const canGo = (location === 0 || hasItem({"type": "other", "id": location}))
    return (
        <>
        {(canGo) ?
            <span>
                <img draggable={false} className={(!isHere) ? 'pixel travel-option cango' : 'pixel travel-option'} onClick={() =>  {if(canGo && !isHere){sfx_click01();changeLocation(location+1)}}} onMouseEnter={() => {if(!isHere){sfx_lightclick()}}} src={miscImg["locationlabel"+(location+1).toString()]} alt={"???"}/>
                {isHere && <img draggable={false} className='pixel travel-option' src={miscImg["urhere"]} alt={"???"}/>}
            </span> :
            <span>
                <img draggable={false} className='pixel travel-option' src={miscImg["locationlocked"]} alt={"???"}/>
            </span>
        }
        </>
    )
}

function TravelList() {
  
    return (
    <>
      <img draggable={false} className='pixel background' src={backgrounds["travel"]} alt={"the travel menu is also just an overlay"}/>
      <div className='travel-list'>
        <TravelOption location={0} />
        <TravelOption location={1} />
        <TravelOption location={2} />
        <TravelOption location={3} />
      </div>
    </>
    );
  }
  
  export default TravelList;