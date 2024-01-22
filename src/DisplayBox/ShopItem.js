import { useState, useEffect } from 'react';
import useSound from 'use-sound';

import './DisplayBox.css';

import click_light from '../0assets/sfx/click_light.mp3'

import { backgrounds, sprites } from '../0scripts/GeneralScript';
import { getItem, buyItem, hasItem } from '../0scripts/InventoryScript';
import { displayListing, displayLocation } from '../0scripts/TextBoxScript';

function ShopItem({listing, wallet}) {
  const item = getItem(listing.item);
  const price = item.price * listing.count;

  const [sfx_lightclick] = useSound(click_light)
  const [canBuy, setCanBuy] = useState(false);
  const [inStock, setStock] = useState(() => {return !((!listing.restocks) && hasItem(listing.item))});

  useEffect (() => {
    setCanBuy(wallet >= price);
  }, [wallet])

  return (
    <div className='shop-listing' onMouseEnter={() => {sfx_lightclick(); displayListing(listing, price, item, canBuy, inStock)}} onMouseLeave={displayLocation}>
      <div className='center-items'>
        <img draggable={false} className='pixel shop-item' src={sprites[item.image.image]} alt={item.image.alt}/>
        <span>{listing.listing}</span>
      </div>
      <div className='center-items'>
        <span>${price.toFixed(2)}</span>
        {(canBuy && inStock) ? 
          <div className='buy-button' onClick={() => {buyItem(listing, price); if (!listing.restocks) setStock(false)}} >Buy</div> : 
          <div className='buy-button unavailable'>---</div>}

      </div>
    </div>
  );
}

export default ShopItem;
  