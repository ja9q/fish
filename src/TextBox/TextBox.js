import './TextBox.css';

import { sprites } from '../0scripts/GeneralScript';

function TextBox({textbox}) {
    return (
      <div className="rounded noselect text-body">
        <span className='text-top'><strong>{textbox.header}</strong>{textbox.subheader !== "" && <em> - {textbox.subheader} </em>}</span> <br/>
        <div className='flavor-body'>
          {textbox.showsSprite && <img draggable={false} className='pixel flavor-sprite' src={sprites[textbox.sprite.image]} alt={textbox.sprite.alt}/>}
          <span className={(textbox.showsSprite) ? 'side-text' : ''}>{textbox.flavorText}</span>
        </div>
        
        
      </div>
    );
  }
  
  export default TextBox;
  