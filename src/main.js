let board = [];

let isFirstPlayer = true;
let firstPlayer = -1;
let secondPlayer = +1;

let firstPlayerScore = 0;
let secondPlayerScore = 0;

function loadGame(){
    resetBoard();
    createBoard();
}

function createBoard() {
    for (let row = 0; row < 3; row++) {
        let newRow = document.createElement('div');
        newRow.classList.add("row");
        let field = document.getElementById("board");
        field.appendChild(newRow);
        for (let col = 0; col < 3; col++) {
            let newCell = document.createElement('div');
            newCell.classList.add("cell", "empty");
            newCell.addEventListener('click', event => playerStep(newCell, row, col));
            newRow.appendChild(newCell);
        }
    }
}

function playerStep(element, x, y, ) {
    if (!isValidStep(x, y)) {
        return;
    }
    let player = getCurrentPlayer();
    board[x][y] = player;
    element.classList.remove("empty");
    if (player == firstPlayer) {
        element.classList.add("cross");
    }
    else {
        element.classList.add("zero");
    }
    if (gameOwer(player)) {
        setWinner(player);
        resetBoard();
    }
}

function isValidStep(x, y) {
    let isValid = board[x][y] == 0;
    return isValid;
}

function getCurrentPlayer() {
    let player = isFirstPlayer? firstPlayer : secondPlayer;
    isFirstPlayer = !isFirstPlayer;
    return player;
}

function gameOwer(player) {
    let win_state = [
        [board[0][0], board[0][1], board[0][2]],
        [board[1][0], board[1][1], board[1][2]],
        [board[2][0], board[2][1], board[2][2]],
        [board[0][0], board[1][0], board[2][0]],
        [board[0][1], board[1][1], board[2][1]],
        [board[0][2], board[1][2], board[2][2]],
        [board[0][0], board[1][1], board[2][2]],
        [board[2][0], board[1][1], board[0][2]]
    ];

	for (var i = 0; i < 8; i++) {
		var line = win_state[i];
		var filled = 0;
		for (var j = 0; j < 3; j++) {
			if (line[j] == player)
				filled++;
		}
		if (filled == 3)
			return true;
	}
	return false;
}

function setWinner(player) {
    if (player == -1){
        firstPlayerScore++;
        document.getElementById("Player1").innerHTML = firstPlayerScore;
    }
    else {
        secondPlayerScore++;
        document.getElementById("Player2").innerHTML = secondPlayerScore;
    }
}

function resetBoard() {
    board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    document.getElementById("Player1").innerHTML = firstPlayerScore;
    document.getElementById("Player2").innerHTML = secondPlayerScore;
    isFirstPlayer = true;
    let field = document.getElementById("board");
    for (let i = 0; i < field.children.length; i ++) {
        let row = field.children[i];
        for (let j = 0; j < row.children.length; j++) {
            let cell = row.children[j];
            cell.classList.remove("zero");
            cell.classList.remove("cross");
            cell.classList.add("empty");
        }
    }
}

function resetScore() {
    firstPlayerScore = 0;
    secondPlayerScore = 0;
}

function resetGame(){
    resetScore();
    resetBoard();
}

function playWithAI() {
    alert("Not available");
}