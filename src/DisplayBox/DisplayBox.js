import './DisplayBox.css';

import { backgrounds, sprites, miscImg } from '../0scripts/GeneralScript';
import ShopDisplay from './ShopDisplay';




function DisplayBox({gdisplay, atShop}) {

    return (
      <div className="rounded noselect display-body">
        {gdisplay.showsFish && <img draggable={false} className='pixel item' src={sprites[gdisplay.fishDisplay.image]} alt={gdisplay.fishDisplay.alt}/>}
        {gdisplay.showsOverlay && <img draggable={false} className='pixel overlay' src={miscImg[gdisplay.overlay.image]} alt={gdisplay.overlay.alt}/>}
        {/* 8:5 display */}
        <img draggable={false} className='pixel background' src={backgrounds[gdisplay.visual.image]} alt={gdisplay.visual.alt}/>
        {atShop && <ShopDisplay/>}
      </div>
    );
  }
  
  export default DisplayBox;
  