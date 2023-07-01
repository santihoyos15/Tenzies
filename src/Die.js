import React from "react"

const diceShapes = [
    [
        [false, false, false], 
        [false, true, false],
        [false, false, false],
    ], 
    [
        [true, false, false], 
        [false, false, false],
        [false, false, true],
    ], 
    [
        [false, false, true], 
        [false, true, false],
        [true, false, false],
    ], 
    [
        [true, false, true], 
        [false, false, false],
        [true, false, true],
    ],
    [
        [true, false, true], 
        [false, true, false],
        [true, false, true],
    ],
    [
        [true, false, true], 
        [true, false, true],
        [true, false, true],
    ],
]

const buildDieDots = (dieToRender) => {
    const dieDotsElements = [];

    for (let i = 0; i < dieToRender.length; i++){
	for (let j = 0; j < dieToRender[i].length; j++){
	    const dieDot = dieToRender[j][i];
	    if (dieDot){
		dieDotsElements.push(<div className={`die-dot${i}${j}`}></div>)
	    }
	}
    }

    return dieDotsElements;
}

export default function Die(props) {
    const styles = {backgroundColor: props.isHeld ? "#59E391" : "white"}
    
    const dieToRender = diceShapes[props.value - 1];
    
    return (
        <div 
            className={`die-face`}
            style={styles}
            onClick={props.holdDice}
        >
            {buildDieDots(dieToRender)}
        </div>
    )
}
