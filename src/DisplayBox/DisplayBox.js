import './DisplayBox.css';

function importImages(r) {
  let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '').replace('.png', '')] = r(item); });
	return images;
}

const backgrounds = importImages(require.context('../0assets/backgrounds', false, /\.(png)$/));
const sprites = importImages(require.context('../0assets/sprites', false, /\.(png)$/));
const misc = importImages(require.context('../0assets/misc', false, /\.(png)$/));


function DisplayBox({visual, overlay, hasFish, fish}) {
    return (
      <div className="rounded noselect display-body">
        {hasFish && <img draggable={false} className='pixel fish' src={sprites[fish.image]} alt={fish.alt}/>}
        {overlay.isShowing && <img draggable={false} className='pixel overlay' src={misc[overlay.image]} alt={overlay.alt}/>}
        {/* 8:5 display */}
        <img draggable={false} className='pixel background' src={backgrounds[visual.image]} alt={visual.alt}/>
        
      </div>
    );
  }
  
  export default DisplayBox;
  