let player = "X";
let board = ["", "", "", "", "", "", "", "", ""];
const winConditions = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6]
];
let gameEnded = false;

// Get elements from HTML
const cells = document.querySelectorAll("td");
const message = document.querySelector("#message");
const restartButton = document.querySelector("#restart");

// Add event listeners to cells and restart button
cells.forEach(cell => cell.addEventListener("click", cellClicked));
restartButton.addEventListener("click", restart);

// Function for when a cell is clicked
function cellClicked() {
	// Get cell ID and check if it's already played or the game has ended
	const cellID = Number(this.getAttribute("id"));
	if (board[cellID] !== "" || gameEnded) {
		return;
	}

	// Update board and cell text
	board[cellID] = player;
	this.textContent = player;

	// Check if game is over
	const winner = checkWin();
	if (winner) {
		message.textContent = `${winner} wins!`;
		gameEnded = true;
		return;
	}
	if (board.indexOf("") === -1) {
		message.textContent = "Game ended in a draw.";
		gameEnded = true;
		return;
	}

	// Switch players
	player = player === "X" ? "O" : "X";
	message.textContent = `It's ${player}'s turn.`;
}

// Function to check if the game is over
function checkWin() {
	for (let i = 0; i < winConditions.length; i++) {
		if (board[winConditions[i][0]] === player && board[winConditions[i][1]] === player && board[winConditions[i][2]] === player) {
			return player;
		}
	}
	return null;
}

// Function to restart the game
function restart() {
	player = "X";
	board = ["", "", "", "", "", "", "", "", ""];
	gameEnded = false;
	cells.forEach(cell => cell.textContent = "");
	message.textContent =`It's ${player}'s turn.`;
}