import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { Slider } from "@material-ui/core";
import  randomWords  from '@genzou/random-words'
import { Container } from 'react-bootstrap'


function App() {

  const lengths = [
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
    {
      value: 6,
      label: "6",
    },
    {
      value: 7,
      label: "7",
    },
    {
      value: 8,
      label: "8",
    },
  ];
  const [val, setVal] = useState(6);
  const [wordleWord, setWordleWord] = useState('');
  const [currentInput, setCurrentInput] = useState(0);
  const row = [];
  const game = [];
  const inputRef = useRef();
 
  let letterKey = 0;

  for(let j = 0; j < 6; j++){
    const row = [];
    for(let i = 0; i < val; i++){
      row.push(<input type='text' maxLength='1' box={letterKey} ref={inputRef} />);
      letterKey++;
    };
    game.push(<form className='GameRow'>{ row }</form>);
  }

  useEffect(() => {
    setWordleWord(randomWords({exactly: 1, minLength: val, maxLength: val}));
  }, [val])

  useEffect(() => {

  })


  const updateRange = (e, data) => {
    setVal(data);
  };
  
  console.log({inputRef});

  return (
    <Container>
      <div className='section'>
        <div style={{ height: 150, width: 900, padding: 60, color:'white' }}>
        <h1 >Definitely NOT Wordle</h1>
          <span> Length of Word : {val}</span>
          <Slider value={val} onChange={updateRange} marks={lengths} min={3} max={8}/>
          <br></br>
          <span>{wordleWord.length > 0 ? wordleWord : null}</span>
        </div>
      </div>
      <div className='section'>
        <div className='gameArea'>{game}</div>
      </div>
    </Container>
  );
}

export default App;
