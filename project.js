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
** The GameController
*/
const GameController = (() => {
    let currentTurn = "X";
    let gameActive = true;

    const startGame = () => {
        console.log("Game has started!"); // Initialize game state
        Gameboard.resetBoard();
        gameActive = true;
        currentTurn = "X"; 
        result.textContent = "";
    };

    const switchTurn = () => {
        currentTurn = currentTurn === "X" ? "O" : "X";
    };

    
    const playTurn = (row, col) => {
        if (!gameActive) return; // Ignore clicks if the game is over
        const board = Gameboard.getBoard();
        const result = document.querySelector("#result");

        if (board[row][col] !== "") {
            result.textContent = "Cell is already taken. Choose another!";
            return;
        }

        Gameboard.setBoardVal(row, col, currentTurn);

        const winner = checkWinner(Gameboard.getBoard());
        if (winner === "tie"){
            result.textContent = "It's a tie!";
             
        } else if (winner) {
            result.textContent = `Game over! Winner: ${winner}`;
            gameActive = false; // End the game

        } else {
            switchTurn();
            if (currentTurn === "O" && gameActive) {
                computerMove(); // Trigger the computer's move
            }
        }
    };

    const computerMove = () => {
        const board = Gameboard.getBoard();
        const emptyCells = [];
    
        // Find all empty cells
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (board[row][col] === "") {
                    emptyCells.push({ row, col });
                }
            }
        }
    
        // Choose a random empty cell
        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const { row, col } = emptyCells[randomIndex];
    
        // Make the move
        Gameboard.setBoardVal(row, col, "O");
    
        // Check for a winner
        const winner = checkWinner(board);
        if (winner === "tie") {
            document.querySelector("#result").textContent = "It's a tie!";
            gameActive = false;
        } else if (winner) {
            document.querySelector("#result").textContent = `Game over! Winner: ${winner}`;
            gameActive = false;
        } else {
            switchTurn();
        }
    
        DisplayController.renderGameboard();
    };
    

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
        return "tie";
    }
    return winner;
    }

    return { startGame, playTurn };

})();

const DisplayController = (() => {
    const gameContainer = document.getElementById("game-container");

    const renderGameboard = () => {
        gameContainer.innerHTML = "";

        const board = Gameboard.getBoard();

        // Create the grid dynamically
        board.forEach((row, rowIndex) => {
            row.forEach((cell,colIndex) => {
                const cellDiv = document.createElement("div");
                cellDiv.classList.add("cell");
                cellDiv.textContent = cell;

                // Add an eventlistener to allow user interaction
                cellDiv.addEventListener("click", () => {
                    handleCellClick(rowIndex, colIndex);
                });
                gameContainer.appendChild(cellDiv);
            });
        });
    };

    const handleCellClick = (row, col) => {
        // Pass the row and column to the GameController's `playTurn` method
        GameController.playTurn(row, col);

        // Re-render the board to reflect changes
        renderGameboard();
    };

    return { renderGameboard, handleCellClick };
})();

// Ensure everything is ready after the DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    GameController.startGame(); 
    DisplayController.renderGameboard();
});

// Start button
document.querySelector(".button-start").addEventListener("click", () =>{
    GameController.startGame();
    DisplayController.renderGameboard();
});



