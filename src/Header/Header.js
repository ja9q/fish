import { useState } from 'react';
import './Header.css';
import {ReactComponent as FishIcon} from '../0assets/vectors/fish.svg';
import {ReactComponent as RecordIcon} from '../0assets/vectors/records.svg';
import {ReactComponent as AboutIcon} from '../0assets/vectors/about.svg';
import {ReactComponent as SettingsIcon} from '../0assets/vectors/settings.svg';

function Header({setDisplay}) {

  const [menuLabel, setLabel] = useState("");

  return (
    <header className='noselect'>
      <div> <h1>fishing game</h1> </div>
      <span>
        <span className='menu-label'>{menuLabel}</span>
        <button className='menu-button' onMouseEnter={() => {setLabel("home");}} onMouseLeave={() => {setLabel("");}} onClick={() => {setDisplay(0);}} ><FishIcon /></button>
        <button className='menu-button' onMouseEnter={() => {setLabel("records");}} onMouseLeave={() => {setLabel("");}} onClick={() => {setDisplay(1);}} ><RecordIcon /></button>
        <button className='menu-button' onMouseEnter={() => {setLabel("about");}} onMouseLeave={() => {setLabel("");}} onClick={() => {setDisplay(2);}} ><AboutIcon /></button>
        <button className='menu-button' onMouseEnter={() => {setLabel("settings");}} onMouseLeave={() => {setLabel("");}} onClick={() => {setDisplay(3);}} ><SettingsIcon/></button>
      </span>
    </header>
  );
}

export default Header;
