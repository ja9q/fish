import './TextBox.css';

function TextBox(props) {
    return (
      <div className="rounded noselect text-body">
        <strong>{props.location} - weather</strong> 
        {props.flavorText}
      </div>
    );
  }
  
  export default TextBox;
  