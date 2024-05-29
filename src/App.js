import React, { useState } from "react";
import "./App.css";
import { Slider } from "@material-ui/core";
import randomWords from "@genzou/random-words";
import { Container } from "react-bootstrap";
import Game from "./components/Game";

function App() {
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
	const [lengthOfWord, setLengthOfWord] = useState(5);

	// Generates new words on change of slider value
	const wordleWord = randomWords({
		exactly: 1,
		minLength: lengthOfWord,
		maxLength: lengthOfWord,
	})[0].toUpperCase();

	// Function to update the value state
	function updateRange(e, data) {
		setLengthOfWord(data);
	}

	return (
		<>
			<Container>
				<div className="section">
					<div style={{ height: 150, width: 900, padding: 60, color: "white" }}>
						<h1>Definitely NOT Wordle</h1>
						<span> Length of Word : {lengthOfWord}</span>
						<Slider value={lengthOfWord} onChange={updateRange} marks={lengths} min={3} max={8} />
						<br></br>
					</div>
				</div>
				<div className="section">
					<Game wordleWord={wordleWord} lengthOfWord={lengthOfWord} />
				</div>
			</Container>
		</>
	);
}

export default App;
