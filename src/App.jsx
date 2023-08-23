import React, { useEffect, useState } from "react";
import Die from "./Die";
import "./App.css"
import { nanoid } from "nanoid";

function App() {
  
  const [dice,setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue)
      console.log("You Won")
  },[dice])

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
    setDice(oldDice => oldDice.map(die => {
      return(die.isHeld ? die : generateNewDie())
    }))
  }

  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return( die.id === id ? {...die, isHeld: !die.isHeld} : die )
    }))
  }
  
  const diceElements = dice.map(die => <Die key={die.id} value={die.value} isHeld={die.isHeld} isHold={() => holdDice(die.id)}/>)

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        {diceElements}
      </div>
      <button onClick={rollDice}>Roll</button>
    </main>
  )
}

export default App