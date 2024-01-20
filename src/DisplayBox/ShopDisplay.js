import './DisplayBox.css';

import { backgrounds, sprites, miscImg } from '../0scripts/GeneralScript';




function ShopDisplay({atShop}) {

    return (
      <>
        <img draggable={false} className='pixel background' src={backgrounds["shop"]} alt={"the shop is just an overlay. there's no dedicated setting."}/>
      </>
    );
  }
  
  export default ShopDisplay;
  