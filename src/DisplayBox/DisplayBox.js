import './DisplayBox.css';
import Records from './Records.js';
import About from './About.js';
import Settings from './Settings.js';

function importImages(r) {
  let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '').replace('.png', '')] = r(item); });
	return images;
}

const backgrounds = importImages(require.context('../0assets/backgrounds', false, /\.(png)$/));
//const sprites = importImages(require.context('../0assets/sprites', false, /\.(png)$/));


function DisplayBox({displayMode}) {
    return (
      <div className="rounded noselect display-body">
        {/* 8:5 display */}
        {displayMode === 0 && <img draggable={false} className='pixel background' src={backgrounds["newday"]} alt={"new day"}/>}
        {displayMode === 1 && <Records/>}
        {displayMode === 2 && <About/>}
        {displayMode === 3 && <Settings/>}
      </div>
    );
  }
  
  export default DisplayBox;
  