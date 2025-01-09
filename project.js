/*
** The Gameboard represents the state of the board
*/
const Gameboard = (() => {
    // Initial empty board
    let board = [        
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]; 
    
    // Add method to get board when requested
    const getBoard = () => {
        return board;
    }

    // Add method to clear board
    const resetBoard = () => {
        board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ];
    }

    const setBoardVal = (row,col,val) => {
        board[row][col] = val;
    }
    return {getBoard, resetBoard, setBoardVal};
})();

/*
** The Player 
*/
const Player = (name, marker) => {
    return {name, marker};
};

/*
** The GameController
*/
const GameController = (() => {
    let currentTurn = "X";

    const startGame = () => {
        console.log("Game has started!"); // Initialize game state
        Gameboard.resetBoard();
        currentTurn = "X"; 
    };

    const switchTurn = () => {
        currentTurn = currentTurn === "X" ? "O" : "X";
    };

    const playTurn = (row, col) => {
        const board = Gameboard.getBoard();

        if (board[row][col] !== "") {
            console.log("Cell is already taken. Choose another!")
            return;
        }

        Gameboard.setBoardVal(row, col, currentTurn);

        const winner = checkWinner(Gameboard.getBoard());
        if (winner){
            console.log(`Game over! Winner: ${winner}`);
            Gameboard.resetBoard(); 
        } else {
            switchTurn();
        }
    }

    const checkWinner = (board) => {
        const size = board.length; // Assuming a 3x3 board
        let winner = null;

    // Check rows
    for (let row = 0; row < size; row++) {
        if (board[row][0] !== "" && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            winner = board[row][0];
        }
    }

    // Check columns
    for (let col = 0; col < size; col++) {
        if (board[0][col] !== "" && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            winner = board[0][col];
        }
    }

    // Check diagonals
    if (board[0][0] !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        winner = board[0][0];
    }
    if (board[0][2] !== "" && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        winner = board[0][2];
    }

    // Check for tie
    const isFull = board.every(row => row.every(cell => cell !== ""));
    if (!winner && isFull) {
        return "It's a tie!";
    }

    return winner;
    }

    return { startGame, playTurn };

})();

