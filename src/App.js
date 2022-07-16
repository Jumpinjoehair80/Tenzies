import React from 'react';
import './styles.css';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice);

  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allDiceHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allDiceHeld && allSameValue) {
      setTenzies(true);
      console.log('You won!!');
    }
  }, [dice]);

  function allNewDice() {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollHandler() {
    if (!tenzies) {
      setDice((prevDice) => {
        return prevDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        });
      });
    } else {
      setTenzies(false);
      setDice(generateNewDie());
    }
  }

  function holdDice(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));
  console.log(diceElements);

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className='title'>Tenzies</h1>
      <p className='instructions'>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className='app-container'>{diceElements}</div>
      <button className='roll-dice' onClick={rollHandler}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
    </main>
  );
}
