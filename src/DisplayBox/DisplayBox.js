import './DisplayBox.css';

import { useGDisplay } from '../0contexts/GameDisplayContext';

function importImages(r) {
  let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '').replace('.png', '')] = r(item); });
	return images;
}

const backgrounds = importImages(require.context('../0assets/backgrounds', false, /\.(png)$/));
const sprites = importImages(require.context('../0assets/sprites', false, /\.(png)$/));
const misc = importImages(require.context('../0assets/misc', false, /\.(png)$/));


function DisplayBox() {
  const gdisplay = useGDisplay();
    return (
      <div className="rounded noselect display-body">
        {gdisplay.showsFish && <img draggable={false} className='pixel fish' src={sprites[gdisplay.fish.image]} alt={gdisplay.fish.alt}/>}
        {gdisplay.showsOverlay && <img draggable={false} className='pixel overlay' src={misc[gdisplay.overlay.image]} alt={gdisplay.overlay.alt}/>}
        {/* 8:5 display */}
        <img draggable={false} className='pixel background' src={backgrounds[gdisplay.visual.image]} alt={gdisplay.visual.alt}/>
        
      </div>
    );
  }
  
  export default DisplayBox;
  