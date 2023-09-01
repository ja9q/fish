import './DisplayBox.css';

function importImages(r) {
  let images = {};
  r.keys().forEach((item, index) => { images[item.replace('./', '').replace('.png', '')] = r(item); });
	return images;
}

const backgrounds = importImages(require.context('../0assets/backgrounds', false, /\.(png)$/));
//const sprites = importImages(require.context('../0assets/sprites', false, /\.(png)$/));


function DisplayBox({visual}) {
    return (
      <div className="rounded noselect display-body">
        {/* 8:5 display */}
        <img draggable={false} className='pixel background' src={backgrounds[visual.image]} alt={visual.alt}/>
        
      </div>
    );
  }
  
  export default DisplayBox;
  