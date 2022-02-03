import React, { useState, useEffect } from 'react';
import './App.css';
import { Slider } from "@material-ui/core";
import  randomWords  from '@genzou/random-words'
import { Container } from 'react-bootstrap'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';





function App() {


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#000000',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

  //Min and Max lengths of words
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

  // States
  const [val, setVal] = useState(5);
  const [wordleWord, setWordleWord] = useState("");
  const [currentInput, setCurrentInput] = useState(0);
  const [currentRow, setCurrentRow] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const game = [];
 
  // string compare
  function strCompare(str1,str2){
    return str1 === str2 ;
}

  // Handle word
  function handleRowForm(inputWord) {
    console.log(inputWord);
    console.log(wordleWord);
    if(strCompare(inputWord, wordleWord)){
      //ALL GREEN
      for(let x = 0; x < val; x++){
        // If wordle word has the letter
        let letterIndex = ((currentRow - 1) * val) + x;
        document.querySelector("[box=" + CSS.escape(letterIndex) + "]").classList.add("box-green");
      }
      console.log('win!');
      setGameWon(true);
      setGameOver(true);
      setIsOpen(true);
    } else {
      // Go through each letter
      for(let x = 0; x < val; x++){
        // If wordle word has the letter
        let letterIndex = ((currentRow - 1) * val) + x;

        if(wordleWord.includes(inputWord.substring(x, x+1))) {
          if(wordleWord.indexOf(inputWord.substring(x, x+1)) === inputWord.indexOf(inputWord.substring(x, x+1))){
            document.querySelector("[box=" + CSS.escape(letterIndex) + "]").classList.add("box-green");
            console.log(inputWord.substring(x, x+1) + ": GREEN");
          } else {
            console.log(inputWord.substring(x, x+1) + ': YELLOW');
            document.querySelector("[box=" + CSS.escape(letterIndex) + "]").classList.add("box-yellow");
          }
        } else {
          console.log(inputWord.substring(x, x+1) + ': BLACK');
        }
      }

      if(currentRow !== 6) {
        setCurrentRow(currentRow+1);
        setCurrentInput(currentInput+1);
      }
    }

    if(currentRow === 6){
      setGameOver(true);
      setIsOpen(true);
    }
  }


  // Handle change of boxes
  function handleChange(event) {
    var key = event.key;
    var keyCode = event.keyCode;
    let inputWord = '';

    // Disable all keys but alphabet letters and backspace
    if (!((keyCode >= 65 && keyCode <= 90) || keyCode === 8 || keyCode === 116))
      event.preventDefault()


    console.log(keyCode);
    if(key === 'Enter') {
      //console.log((currentInput + 1) % val);
      if((currentInput + 1) % val === 0 && document.querySelector("[box=" + CSS.escape(currentInput) + "]").value !== '') {
        for(let x = 0; x < val; x++){
          let letterIndex = ((currentRow - 1) * val) + x;
          console.log(document.querySelector("[box=" + CSS.escape(letterIndex) + "]").value);
          inputWord = inputWord.concat(document.querySelector("[box=" + CSS.escape(letterIndex) + "]").value);
        }
        handleRowForm(inputWord);
      }
      //if it's a letter or backspace
    } else if ((keyCode >= 65 && keyCode <= 90) || keyCode === 8) {
      // if not at end of row
      if((currentInput + 1) % val !== 0) {
        //if it's not the first box
        if(parseInt(event.target.getAttribute('box')) !== 0) {
          // if backspace is pressed
          if(key ==='Backspace'){
            // replace last box with '' and focus on it
            document.querySelector("[box=" + CSS.escape(currentInput - 1) + "]").value = '';
            setCurrentInput(parseInt(event.target.getAttribute('box')) - 1)
            // if any letter is pressed
          } else {
            if(event.target.value === ''){
              console.log(event.target.value);
              setCurrentInput(parseInt(event.target.getAttribute('box')) + 1);
            }
          }
        // if it's the first box
        } else {
          if(key !== 'Backspace'){
            if(event.target.value === ''){
              console.log('y');
              setCurrentInput(parseInt(event.target.getAttribute('box')) + 1);
            } else {
              console.log('n');
              setCurrentInput(parseInt(event.target.getAttribute('box')) + 1);
            }
          }
        }
      // if at end of row
      } else {
        if(key ==='Backspace'){
          document.querySelector("[box=" + CSS.escape(currentInput - 1) + "]").value = '';
          setCurrentInput(parseInt(event.target.getAttribute('box')) - 1)
        }
      }
      //if its not a letter, backspace or enter
    }
  }
  

  // Handle submit of words
  function handleSubmit(event){
    event.preventDefault();
    console.log(handleSubmit)
  }
  

  // Setup board
  let letterKey = 0;
  for(let j = 0; j < 6; j++){
    const row = [];
    for(let i = 0; i < val; i++){
      row.push(<input type='text' maxLength='1' box={letterKey} onKeyDown={ (event) => handleChange(event) } required />);
      letterKey++;
    };
    game.push(<form className='GameRow' onSubmit={handleSubmit}>{ row }</form>);
  }


  // Generates new words on change of slider value
  useEffect(() => {
    setWordleWord(randomWords({exactly: 1, minLength: val, maxLength: val})[0]);
  }, [val])

  // On change of inputs, change the focus
  useEffect(() => {
    console.log(currentInput);
    //console.log(document.querySelector("[box=" + CSS.escape(currentInput) + "]"));
    document.querySelector("[box=" + CSS.escape(currentInput) + "]").focus();
  }, [currentInput])


  // Function to update the value state
  const updateRange = (e, data) => {
    setVal(data);
  };
  
  function closeModal() {
    setIsOpen(false);
  }


  /**        <MyVerticallyCenteredModal
        result = {gameWon}
        show={gameOver}
        onHide={() => setGameOver(false)}
        /> */

  return (
    <>
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
        <Modal
          open={modalIsOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Result
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            { gameWon
            ? <h3>You Won!</h3>
            : <h3>You lost :/</h3>
            }
            </Typography>
          </Box>
        </Modal>
      </Container>
    </>
  );
}

export default App;
