import './DisplayBox.css';

import ShopItem from './ShopItem';

import { backgrounds, sprites, miscImg } from '../0scripts/GeneralScript';


function DisplayBox({gdisplay, atShop, shop, wallet}) {

  const shopListing = shop.map((item) => 
    <ShopItem listing={item} wallet={wallet} />);

    return (
      <div className="rounded noselect display-body">
        {gdisplay.showsFish && <img draggable={false} className='pixel item' src={sprites[gdisplay.fishDisplay.image]} alt={gdisplay.fishDisplay.alt}/>}
        {gdisplay.showsOverlay && <img draggable={false} className='pixel overlay' src={miscImg[gdisplay.overlay.image]} alt={gdisplay.overlay.alt}/>}
        {/* 8:5 display */}
        <img draggable={false} className='pixel background' src={backgrounds[gdisplay.visual.image]} alt={gdisplay.visual.alt}/>
        {atShop && <>
          <img draggable={false} className='pixel background' src={backgrounds["shop"]} alt={"the shop is just an overlay. there's no dedicated background."}/>
          <div className='shop-list'>
            {shopListing}
          </div>
        </>
        }
      </div>
    );
  }
  
  export default DisplayBox;
  

