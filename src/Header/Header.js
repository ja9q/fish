import { useState } from 'react';
import useSound from 'use-sound';

import click01 from '../0assets/sfx/click_01.mp3'
import './Header.css';
import {ReactComponent as FishIcon} from '../0assets/vectors/fish.svg';
import {ReactComponent as RecordIcon} from '../0assets/vectors/records.svg';
import {ReactComponent as AboutIcon} from '../0assets/vectors/about.svg';
import {ReactComponent as SettingsIcon} from '../0assets/vectors/settings.svg';

function Header({setDisplay}) {

  const [sfx_click01] = useSound(click01);
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
      </span>
    </header>
  );
}

export default Header;
