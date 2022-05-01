import React from "react"
import "./style.css"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
import elapsedTime from "./elapsedTime.js"

export default function App() {
    const [dice, setDice] = React.useState(() => allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const [rolls, setRolls] = React.useState(0)
    const [bestScore, setBestScore] = React.useState(() => localStorage.getItem("bestScore"))
    const [time, setTime] = React.useState(() => performance.now())
    const [bestTime, setBestTime] = React.useState(() => localStorage.getItem("bestTime"))
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])
    
    React.useEffect(() => {
        if (tenzies){
            if (!bestScore){
                setBestScore(rolls)
                localStorage.setItem("bestScore", rolls)
            } else if (rolls < bestScore){
                setBestScore(rolls)
                localStorage.setItem("bestScore", rolls)
            }
            
            let gameTime = elapsedTime(time)
            
            if (!bestTime) {
                setBestTime(gameTime)
                localStorage.setItem("bestTime", gameTime)
            } else if (gameTime < bestTime){
                setBestTime(gameTime)
                localStorage.setItem("bestTime", gameTime)
            }
        }
    }, [tenzies])

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
            setRolls(prevRolls => prevRolls + 1)
        } else {
            setTenzies(false)
            setDice(allNewDice())
            setRolls(0)
            setTime(performance.now())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <div>
                <p>{tenzies ? `Rolls: ${rolls}` : ""}</p>
                {tenzies && <p>Time: {elapsedTime(time)} seconds</p>}
                <p>{tenzies ? `Best time: ${bestTime} seconds` : ""}</p>
            </div>
            <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}