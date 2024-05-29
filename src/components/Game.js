import React, { useEffect, useState } from "react";
import "../App.css";
import GameModal from "./GameModal";

export default function Game({ wordleWord, lengthOfWord }) {
	const [gameWon, setGameWon] = useState(false);
	const [modalIsOpen, setIsOpen] = useState(false);
	const [currentRow, setCurrentRow] = useState(0);
	const [greenBoxes, setGreenBoxes] = useState([]);
	const [yellowBoxes, setYellowBoxes] = useState([]);

	const [guesses, setGuesses] = useState(new Array(6).fill(" ".repeat(lengthOfWord)));

	useEffect(() => {
		setGuesses(new Array(6).fill(" ".repeat(lengthOfWord)));
	}, [lengthOfWord]);

	// String compare Function
	function strCompare(str1, str2) {
		return str1.toUpperCase() === str2.toUpperCase();
	}

	// Handle word
	function handleRowCheck() {
		// If words are the same then game is won
		if (strCompare(guesses[currentRow], wordleWord)) {
			// ALL GREEN
			let indexes = [];
			for (let x = 0; x < lengthOfWord; x++) {
				// Make all boxes Green
				let letterIndex = (currentRow - 1) * lengthOfWord + x;
				indexes.push(letterIndex);
			}
			// Open Modal and display win

			setGreenBoxes([...greenBoxes, ...indexes]);
			setGameWon(true);
			setIsOpen(true);

			// If words don't match
		} else {
			let letterTracker = {};

			// Count amount of instances of each letter in wordle Word
			for (let x = 0; x < lengthOfWord; x++) {
				if (letterTracker[wordleWord.charAt(x)])
					letterTracker[wordleWord.charAt(x)] = letterTracker[wordleWord.charAt(x)] + 1;
				else letterTracker[wordleWord.charAt(x)] = 1;
			}

			// Go through each letter to see if there's greens
			let indexes = [];
			for (let x = 0; x < lengthOfWord; x++) {
				// Box of specific letter
				let letterIndex = (currentRow - 1) * lengthOfWord + x;
				//If letter is still left in the word && If letter is in the right spot
				if (
					letterTracker[guesses[currentRow].charAt(x)] > 0 &&
					wordleWord.charAt(x) === guesses[currentRow].charAt(x)
				) {
					indexes.push(letterIndex);
					console.log(guesses[currentRow].charAt(x) + ": GREEN");
					letterTracker[guesses[currentRow].charAt(x)] =
						letterTracker[guesses[currentRow].charAt(x)] - 1;
				}
			}
			setGreenBoxes([...greenBoxes, ...indexes]);

			indexes = [];
			// Go through the yellows now
			for (let y = 0; y < lengthOfWord; y++) {
				// Box of specific letter
				let letterIndex = (currentRow - 1) * lengthOfWord + y;

				// If letter is in the wrong spot
				if (letterTracker[guesses[currentRow].charAt(y)] > 0) {
					console.log(letterTracker[guesses[currentRow].charAt(y)] + ": YELLOW");
					indexes.push(letterIndex);

					letterTracker[guesses[currentRow].charAt(y)] =
						letterTracker[guesses[currentRow].charAt(y)] - 1;

					// Letter is not in the word
				} else {
					console.log(guesses[currentRow].substring(y, y + 1) + ": BLACK");
				}
			}
			setYellowBoxes([...yellowBoxes, ...indexes]);

			// If it gets this far then game continues, goes to next row
			if (currentRow !== 5) {
				setCurrentRow(currentRow + 1);
			}
		}

		// If all rows are filled then Open Modal and display loss
		if (currentRow === 5) {
			setIsOpen(true);
		}
	}

	// Handle change of boxes
	function handleChange(event) {
		const keyCode = event.keyCode;

		let newWord = "";

		// Disable all keys but alphabet letters and backspace
		if (!((keyCode >= 65 && keyCode <= 90) || keyCode === 8 || keyCode === 13)) return;

		// If Backspace Key is pressed
		if (keyCode === 8) {
			// If current input is not beggining of the row and not at the end of the row
			if (guesses[currentRow].charAt(0) === " ") return;
			let firstSpace = guesses[currentRow].indexOf(" ");
			if (firstSpace === -1)
				newWord = guesses[currentRow].substring(0, guesses[currentRow].length - 1) + " ";
			else
				newWord =
					guesses[currentRow].substring(0, firstSpace - 1) +
					" " +
					guesses[currentRow].substring(firstSpace);

			setGuesses([...guesses.slice(0, currentRow), newWord, ...guesses.slice(currentRow + 1)]);

			// If Enter Key is pressed
		} else if (keyCode === 13) {
			// If current guess doesn't have enough letters, return

			if (guesses[currentRow].indexOf(" ") !== -1) return;
			// If current guess is valid length, then check guess
			handleRowCheck();
			// If any Letter Key is pressed thats not backspace or enter
		} else {
			// If current guess is at max length, return
			let firstSpace = guesses[currentRow].indexOf(" ");
			if (firstSpace === -1) return;
			// If current guess is not at max length, add new letter
			newWord =
				guesses[currentRow].substring(0, firstSpace) +
				String.fromCharCode(keyCode) +
				guesses[currentRow].substring(firstSpace + 1);
			setGuesses([...guesses.slice(0, currentRow), newWord, ...guesses.slice(currentRow + 1)]);
		}
	}

	function closeModal() {
		setIsOpen(false);
	}

	const game = guesses.map((currRow, rowIndex) => {
		let splitRow = currRow.split("");
		return (
			<div className="GameRow" key={rowIndex}>
				{splitRow.map((letter, letterIndexInRow) => {
					let boxStyle = "box-black";
					let letterIndex = (rowIndex - 1) * lengthOfWord + letterIndexInRow;
					if (greenBoxes.indexOf(letterIndex) !== -1) boxStyle = "box-green";
					else if (yellowBoxes.indexOf(letterIndex) !== -1) boxStyle = "box-yellow";
					return (
						<div className={`box ${boxStyle}`} key={letterIndex}>
							{letter}
						</div>
					);
				})}
			</div>
		);
	});

	return (
		<div tabIndex="0" className="gameArea" onKeyDown={(event) => handleChange(event)}>
			<GameModal
				modalIsOpen={modalIsOpen}
				closeModal={closeModal}
				gameWon={gameWon}
				wordleWord={wordleWord}
			/>
			{game}
		</div>
	);
}
