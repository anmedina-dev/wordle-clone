import React from "react";
import "../App.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "#000000",
	border: "2px solid #000",
	boxShadow: 24,
	p: 4,
};

export default function GameModal({ modalIsOpen, closeModal, gameWon, wordleWord }) {
	return (
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
					{gameWon ? (
						<>You Won! The word was {wordleWord}</>
					) : (
						<>You lost :/ The word was {wordleWord}</>
					)}
				</Typography>
			</Box>
		</Modal>
	);
}
