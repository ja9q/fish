import { miscImg } from "../0scripts/GeneralScript"


import './DisplayBox.css';


function QuickTime({qte, qteDispatch}) {

    // this part has mostly been abandoned lol    

    return (
    <div className="qte-container">
        <div className="qte-ring">
            <img draggable={false} className='pixel qte'  src={miscImg["qte_circle"]} alt={""}/>
            <div  className='qte qte-area'>
                <img draggable={false} style={{transform: `rotate(${qte.areaPos}deg)`}} className='pixel qte' src={miscImg["qte_area"]} alt={""}/>
            </div>
            <img draggable={false} className='pixel qte' src={miscImg["qte_line"]} alt={""}/>
            <img draggable={false} style={{transform: `rotate(${qte.qteCursor}deg)`}} className='pixel qte' src={miscImg["qte_cursor"]} alt={""}/>
        </div>
        <div>
            <img draggable={false} className='pixel qte-progress' src={miscImg["qte_progress"]} alt={""}/>
            <img draggable={false} style={{left: `${qte.fishPos}rem`}} className='pixel qte-fish' src={miscImg["qte_fish"]} alt={""}/>
        </div>
        
    </div>
    );
}

export default QuickTime;