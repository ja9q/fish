import './TextBox.css';

function TextBox(props) {
    return (
      <div className="rounded noselect text-body">
        <strong>day {props.dayNumber} {false && "(night)"}</strong> - {props.location} - weather
        {props.flavorText}
      </div>
    );
  }
  
  export default TextBox;
  