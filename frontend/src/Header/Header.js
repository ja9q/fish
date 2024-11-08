import { useState } from 'react';
import useSound from 'use-sound';

import click01 from '../0assets/sfx/click_01.mp3'
import './Header.css';
import {ReactComponent as FishIcon} from '../0assets/vectors/fish.svg';
import {ReactComponent as RecordIcon} from '../0assets/vectors/records.svg';
import {ReactComponent as AboutIcon} from '../0assets/vectors/about.svg';
import {ReactComponent as SettingsIcon} from '../0assets/vectors/settings.svg';
import {ReactComponent as LoginIcon} from '../0assets/vectors/login.svg';

function Header({setDisplay, volume, username, logOut}) {

  const [sfx_click01] = useSound(click01, {volume: volume});
  const [menuLabel, setLabel] = useState("");

  return (
    <header className='noselect'>
      <div> <h1>fishing game</h1> </div>
      <span>
        <span className='menu-label'>{menuLabel}</span>
        <button className='menu-button' onMouseEnter={() => {setLabel("home");}} onMouseLeave={() => {setLabel("");}} onClick={() => {sfx_click01(); setDisplay(0);}} ><FishIcon /></button>
        <button className='menu-button' onMouseEnter={() => {setLabel("records");}} onMouseLeave={() => {setLabel("");}} onClick={() => {sfx_click01(); setDisplay(1);}} ><RecordIcon /></button>
        <button className='menu-button' onMouseEnter={() => {setLabel("about");}} onMouseLeave={() => {setLabel("");}} onClick={() => {sfx_click01(); setDisplay(2);}} ><AboutIcon /></button>
        <button className='menu-button' onMouseEnter={() => {setLabel("settings");}} onMouseLeave={() => {setLabel("");}} onClick={() => {sfx_click01(); setDisplay(3);}} ><SettingsIcon/></button>
        {username == '' ? 
          <button className='menu-button' onMouseEnter={() => {setLabel("log in")}} onMouseLeave={() => {setLabel("");}} onClick={() => {sfx_click01(); setDisplay(4);}} ><LoginIcon/></button> :
          <button className='menu-button' onMouseEnter={() => {setLabel(username+ " - log out")}} onMouseLeave={() => {setLabel("");}} onClick={() => {sfx_click01(); logOut();}} ><LoginIcon/></button>
        }
        
      </span>
    </header>
  );
}

export default Header;
