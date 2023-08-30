import './TextBox.css';

function TextBox(p) {
    return (
      <div className="rounded noselect text-body">
        <strong>day {p.dayNumber} {false && "(night)"}</strong> - location - weather
        <p>good morning! it's a wonderful day to go fishing!</p>
      </div>
    );
  }
  
  export default TextBox;
  