import React, { useEffect, useState } from "react";
import Die from "./Die";
import "./App.css"
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

function App() {
  
  const [dice,setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [rollCount, setRollCount] = useState(0)
  const [bestCount, setBestCount] = useState(0);


  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true);
      if (rollCount < bestCount || bestCount === 0) {
        setBestCount(rollCount);
      }
    }
  },[dice,rollCount,bestCount])

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }
  
  function allNewDice(){
    const newDice = []
    for(let i=0; i < 10; i++){
      newDice.push(generateNewDie())
    }
    return newDice
  }console.log(allNewDice())

  function rollDice() {
    if (!tenzies) {
      setDice(oldDice => oldDice.map(die => (die.isHeld ? die : generateNewDie())));
      setRollCount(prevCount => prevCount + 1);
    } else {
      setTenzies(false);
      setRollCount(0);
      if (bestCount === 0 || rollCount < bestCount) {
        setBestCount(rollCount);
        localStorage.setItem('bestCount', rollCount);
      }
      setDice(allNewDice());
    }
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return( die.id === id ? {...die, isHeld: !die.isHeld} : die )
    }))
  }
  
  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} isHold={() => holdDice(die.id)}/>)

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <div className="roll-stats"> 
        <p className="roll-count">Number of roles: {rollCount}</p>
        <p className="roll-count" style={{ fontWeight: 'bold' }}>Best Count: {bestCount}</p>
      </div>
      <button className="roll-dice" onClick={rollDice}> {tenzies ? "New Game" : "Roll"} </button>
    </main>
  )
}

export default App