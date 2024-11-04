import './DisplayBox.css';

import ShopList from './ShopList';
import TravelList from './TravelList';
import QuickTime from './QuickTime';

import { backgrounds, sprites, miscImg } from '../0scripts/GeneralScript';


function DisplayBox({gdisplay, atShop, shop, wallet, atTravel, qte, qteDispatch, location, volume}) {

    return (
      <div className="rounded noselect display-body">
        {gdisplay.showsFish && <img draggable={false} className='pixel item highlight' src={sprites[gdisplay.fishDisplay.image]} alt={gdisplay.fishDisplay.alt}/>}
        {gdisplay.showsOverlay && <img draggable={false} className='pixel overlay' src={miscImg[gdisplay.overlay.image]} alt={gdisplay.overlay.alt}/>}
        {/* 8:5 display */}
        {false && <QuickTime qte={qte} qteDispatch={qteDispatch} /> }
        <img draggable={false} className='pixel background' src={backgrounds[gdisplay.visual.image]} alt={gdisplay.visual.alt}/>
        {atShop && <ShopList shop={shop} wallet={wallet} volume={volume} />}
        {atTravel && <TravelList location={location} volume={volume} />}
      </div>
    );
  }
  
  export default DisplayBox;
  

