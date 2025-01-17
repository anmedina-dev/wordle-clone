import React from "react";
import "../App.css";

function KeyboardChar({ letter, color }) {
	return (
		<div className={`box ${color}`} key={letter}>
			{letter}
		</div>
	);
}

export default function Keyboard({ greenKeyBoxes, yellowKeyBoxes, blackKeyBoxes }) {
	const topRowChars = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
	const midRowChars = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
	const botRowChars = ["Z", "X", "C", "V", "B", "N", "M"];

	return (
		<section className="keyboard-section">
			<div className="row">
				{topRowChars.map((val) => {
					let charStyle = "box-black";
					if (greenKeyBoxes.indexOf(val) !== -1) charStyle = "box-green";
					else if (yellowKeyBoxes.indexOf(val) !== -1) charStyle = "box-yellow";
					else if (blackKeyBoxes.indexOf(val) !== -1) charStyle = "box-wrong";

					return <KeyboardChar letter={val} key={val} color={charStyle} />;
				})}
			</div>
			<div className="row">
				{midRowChars.map((val) => {
					let charStyle = "box-black";
					if (greenKeyBoxes.indexOf(val) !== -1) charStyle = "box-green";
					else if (yellowKeyBoxes.indexOf(val) !== -1) charStyle = "box-yellow";
					else if (blackKeyBoxes.indexOf(val) !== -1) charStyle = "box-wrong";

					return <KeyboardChar letter={val} key={val} color={charStyle} />;
				})}
			</div>
			<div className="row">
				{botRowChars.map((val) => {
					let charStyle = "box-black";
					if (greenKeyBoxes.indexOf(val) !== -1) charStyle = "box-green";
					else if (yellowKeyBoxes.indexOf(val) !== -1) charStyle = "box-yellow";
					else if (blackKeyBoxes.indexOf(val) !== -1) charStyle = "box-wrong";

					return <KeyboardChar letter={val} key={val} color={charStyle} />;
				})}
			</div>
		</section>
	);
}
