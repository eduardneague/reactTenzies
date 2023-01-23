import { useState, useEffect } from 'react'
import TenzieBox from './TenzieBox'
import { nanoid } from 'nanoid'

import '../src/App.css'

function TenziesContainer() {
  const [screen, setScreen] = useState(1)
  const [rolls, setRolls] = useState(0)

  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    let allHeld = true
    let allSame = true

    // if all the dice are held

    for(let i = 0; i < dice.length; i++) {
      if(dice[i].isHeld === false) {
        allHeld = false
      }
    }

    // if all the dice are the same value

    for(let i = 0; i < dice.length; i++) {
      if(dice[i].value !== dice[0].value) {
        allSame = false
      }
    }

    if(allHeld && allSame) {
      setTenzies(true)
      setScreen(3)
    }

  }, [dice])

  function handleScreenChange() {
     setScreen(2)
  }

  function randomValue() {
    return Math.ceil(Math.random() * 6)
  }

  function allNewDice() {
    let newArray = []
    for(let i = 0; i <= 9; i++) {
      newArray.push(generateNewDie())
    }
    return newArray
  }

  function generateNewDie() {
    return {
        id: nanoid(),
        value: randomValue(),
        isHeld: false
    }
  }

  const diceElements = dice.map((die) => {
    return(
      <TenzieBox
        value = {die.value}
        key = {die.id}
        isHeld = {die.isHeld}
        holdDice = {() => holdDice(die.id)}
      />
    )
  })

  function holdDice(id) {
    setDice((oldDice) => oldDice.map((die) => {
      if(die.id === id) {
        return {
          ...die,
          isHeld: !die.isHeld
        }
      }
      else return die
    })
  )
}

function rollDice() {
    setDice((oldDice) => oldDice.map((die) => {
        if(die.isHeld === true) {
          return die
        } else 
          return generateNewDie()
      })
    )
  }

  function handleRollButton() {
    rollDice()
    setRolls(prevRolls => prevRolls + 1)
  }

  function handleReplay() {
    setScreen(1)
    setDice(allNewDice())
    setRolls(0)
  }

  let message = ""

  if(rolls <= 5) {
    message = `You were actually more likely to win the lottery than to win in only ${rolls} rolls.`
  }
  else if(rolls <= 10) {
    message = `Wow, only ${rolls} rolls, that's quite lucky!`
  }
  else if(rolls  > 10 && rolls <= 20) {
    message = `Hey, ${rolls} rolls isn't bad at all!`
  }
  else if(rolls > 20 && rolls <= 25) {
    message = `Hm, quite unlucky to finish in ${rolls} rolls...`
  }
  else if(rolls > 25) {
    message = `Yeah... ${rolls} rolls is not a great run... Maybe try again?`
  }

  return (
    <> 
    {(() => {
      if(screen === 1) {
        return (
          <div className="tenzies--container">
            <h1 className = "tenzies--title">
          <img  className =  "tenzies--reactLogo" src = "../src/assets/react.svg"/>
          React Tenzies
        </h1>
        <p className = "tenzies--author" >made with ❤️ by edu</p>

      <button className = "tenzies--startButton"
      onClick = {handleScreenChange}>Start</button>
      </div>
        )
      }
      else if(screen === 2) {
        return(
          <div className="tenzies--container">

      <h1 className = "tenzies--title" id = "secondary--title">
        <img  className =  "tenzies--reactLogo" src = "../src/assets/react.svg"/>
        React Tenzies
      </h1>

      <h2 className = "tenzies--instructions">
          Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls
      </h2>

      <div className="tenzies--gridWrapper">
         {diceElements}
      </div>

      <button className = "tenzies--rollButton"
      onClick = {handleRollButton} >Roll</button>
      <h3 className = "tenzies--totalRolls">
        Total rolls: {rolls}
      </h3>

    </div>
        )
      }
      else if(screen === 3) {
        return(
          <div className="tenzies--container">
            <h1 className = "tenzies--title" >You Win!</h1>
            <h2 className = "tenzies--score">
              You have won in <span className = "tenzies--rolls" >{rolls} rolls!</span>
            </h2>
            <h2 className = "tenzies--message">
              {message}
            </h2>

            <button 
            className = "tenzies--replay" 
            onClick = {handleReplay} >Start again</button>
      
          </div>
        )
      }
  })
  () // calling the function again
}
    </>
  )
}

export default TenziesContainer
