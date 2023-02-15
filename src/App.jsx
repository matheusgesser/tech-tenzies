import React from "react";
import styled from "styled-components";
import {nanoid} from "nanoid"

// Components
import Instructions from "./components/Instructions"
import Dice from "./components/Dice"
import Confetti from 'react-confetti'

export default function App() {
  const [dice, setDice] = React.useState(generateDiceElements())
  const [won, setWon] = React.useState(false)
  const [showInstructions, setShowInstructions] = React.useState(false)
  const [time, setTime] = React.useState(0)
  const intervalRef = React.useRef();
  
  // TODO Store username in session storage by modal w/ input
  // TODO Add ranking aside

  function generateDiceElements() {
    const dices = []
    for (let i=0;i<10;i++) {
      let diceValue = Math.ceil(Math.random()*9)
      dices.push({
        id: nanoid(), 
        value: diceValue, 
        locked: false,
        hold: holdDice
      })
    }
    return dices
  }

  function rollDices() {
    setDice(oldDice => {
      return oldDice.map(dice => {
        return dice.locked ? dice :
        {...dice, value: newDiceValue(dice.value), id: nanoid()}
      })
    })
  }

  // ? Prevents rolling same value
  function newDiceValue(oldValue) {
    let newValue = Math.ceil(Math.random()*9)
    return oldValue == newValue ? newDiceValue(newValue) : newValue
  }

  function holdDice(id) {
    setDice(oldDice => {
      return oldDice.map(dice => {
        return dice.id === id ? 
        {...dice, locked: !dice.locked} :
        dice
      })
    })
  }

  // ? Check if user won
  React.useEffect(() => {
    let allLocked = dice.every(dice => dice.locked)
    let allSame = new Set(dice.map(dice => dice.value)).size == 1 ? true : false
    if (allLocked && allSame) {
      setWon(true)
    }
  }, [dice])

  function resetGame() {
    setWon(false)
    setDice(oldDice => {
      return oldDice.map(dice => {
        return {...dice, locked: false}
      })
    })
    generateDiceElements()
    rollDices()
    setTime(0)
  }

  // ? Controls timer by [won] state
  React.useEffect(() => {
    !won ? startTimer() : stopTimer()
  }, [won]);

  function startTimer(){
    intervalRef.current = setInterval(() => {
      setTime(prevTime => prevTime+1/20)
    }, 40)
  }
  
  function stopTimer(){
    clearInterval(intervalRef.current)
  }
  
  // ? Store dices to be rendered
  const diceElements = dice.map(dice => {
    return (
      <Dice
        key={dice.id}
        id={dice.id}
        value={dice.value}
        locked={dice.locked}
        hold={dice.hold}
      />
    )
  })

  return (
    <>
      <Help onClick={() => setShowInstructions(true)}>?</Help>
      {showInstructions &&
      <Instructions close={() => setShowInstructions(false)} closeText="GOT IT"/>}
      <Game>
        <Title>TechTenzies</Title>
        <Timer>{time.toFixed(2)}s</Timer>
        <GameSection>
          {diceElements}
        </GameSection>
        {won && <Confetti numberOfPieces={100} style={{zIndex: -1}} />}
        <MyButton onClick={won?resetGame:rollDices}>
          {won?'PLAY AGAIN':'ROLL'}
        </MyButton>
      </Game>
      <Socials>
        <a
        href="https://github.com/matheusgesser"
        target={"_blank"}>
          <Icon src="./src/assets/github.svg" alt="Github Logo"/>
        </a>
        <a
        href="https://www.linkedin.com/in/matheusgesser/"
        target={"_blank"}>
          <Icon src="./src/assets/linkedin.svg" alt="LinkedIn Logo"/>
        </a>
      </Socials>
    </>
  )
}

const Game = styled.div`
  background: rgba(255, 255, 255, 0.1);
  width: 90vw;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  border-radius: 50px;
  z-index: 1;
`

const Title = styled.h2`
  color: #00ADB5;
  font-size: 3rem;
  padding: 1rem 0 0 0;
`

const Help = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0.5rem;
  padding: 1rem;
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  background: #eee;
  color: #222;
  font-size: 2rem;
  cursor: pointer;
`

const Timer = styled.p`
  font-size: 3rem;
  color: #eee;
`

const GameSection = styled.div`
  margin: 2rem 0;
  /* background: #ccc; */
  width: 90%;
  min-height: 3rem;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  @media (max-width: 900px) {
    width: 100%;
  }
`

const MyButton = styled.button`
  padding: 1rem;
  font-size: 2rem;
  color: #222;
  background: #00ADB5;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  box-shadow: 0 6px 0 #555;
  transition: all 100ms;
  &:active {
    transform: translateY(6px);
    box-shadow: none;
  }
`

const Socials = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  height: 4rem;
  background: #eee;
  position: absolute;
  bottom: 0.5rem;
  border-radius: 30px;
`

const Icon = styled.img`
  height: 2rem;
  width: 2rem;
  padding: 1rem;
  cursor: pointer;
  border-radius: 30px;
`