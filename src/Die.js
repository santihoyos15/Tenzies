import React from "react"

export default function Die(props) {
    const styles = {backgroundColor: props.isHeld ? "#59E391" : "white"}
    
    const dot1IsRendered = props.value === 1 || props.value === 3 || props.value === 5
    
    const dot2IsRendered = 
        props.value === 2 || props.value === 4 || props.value === 5 || props.value === 6
        
    const dot3IsRendered = props.value === 6
    
    const dot4IsRendered = 
    props.value === 3 || props.value === 4 || props.value === 5 || props.value === 6
    
    const dot5IsRendered = dot4IsRendered
    
    const dot6IsRendered = dot3IsRendered
    
    const dot7IsRendered = dot2IsRendered
    
    return (
        <div 
            className={`die-face`}
            style={styles}
            onClick={props.holdDice}
        >
            {dot1IsRendered && <div className="die-dot1"></div>}
            {dot2IsRendered && <div className="die-dot2"></div>}
            {dot3IsRendered && <div className="die-dot3"></div>}
            {dot4IsRendered && <div className="die-dot4"></div>}
            {dot5IsRendered && <div className="die-dot5"></div>}
            {dot6IsRendered && <div className="die-dot6"></div>}
            {dot7IsRendered && <div className="die-dot7"></div>}
        </div>
    )
}