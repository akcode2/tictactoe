// let currentPlayer = 'X';

// const gridDivs = document.querySelectorAll('.game > div');

// function placeMark(event) {
//     // Change the color of the mark
//     event.currentTarget.classList.add(currentPlayer);

//     // Enable animation
//     event.currentTarget.classList.add('puff-in-center');

//     // Create the span to contain the mark
//     const mark = document.createElement('span');
//     mark.innerText = currentPlayer;

//     // Add the mark
//     event.currentTarget.appendChild(mark);
//     console.log(event.target);
//     // Disable further clicking on the div and its span
//     event.target.removeEventListener('click', placeMark);
//     event.currentTarget.removeEventListener('click', placeMark);

//     // Change the current player
//     if (currentPlayer === 'X') {
//         currentPlayer = 'O';
//     }
//     else {
//         currentPlayer = 'X';
//     }
// }

// // Make the grid cells clickable
// gridDivs.forEach(element => element.addEventListener('click',  placeMark));

// ------------------------
// Gameboard object
// .. define board array
// .. method to get the board
// .. method to place a mark
// .. method to print board to console
// .. return getBoard, placeMark, printBoard
//
// factory function to create cells
// .. method to change cell's value to player's mark
// .. method to return cell's value
// .. return updateCell and getValue
//
// GameController module - control turns and determine winner
// .. calls Gameboard module
// .. defines players
// .. define current player
// .. method to switch turns
// .. method to print a new round
// .. method to play a round
// .. return playRound and getActivePlayer

// Factory function to create a Cell object
const Cell = () => {
    // Initial value of a cell is 0
    let value = 0;

    const updateCell = (player) => {
        value = player;
    };

    // Method to actually get the value
    const getValue = () => value;

    return {
        updateCell,
        getValue
    };
};

// Create gameBoard as a factory function
const gameBoard = () => {
    const rows = 3;
    const columns = 3;
    const board = [];

    // Create 2D array
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    // Method to return board array (using implicit return of arrow functions)
    const getBoard = () => board;

    // Method to place a mark if it's valid
    const placeMark = (row, column, player) => {
        if (board[row][column].getValue() === 0) {
            board[row][column].updateCell(player);
            return true;
        }
        else {
            console.log('Invalid placement. Try again.');
            return false;
        }
    }

    // Method to print board to the console
    const printBoard = () => {
        const boardValues = board.map((row) => row.map((cell) => cell.getValue()));
        boardValues.forEach((row) => {
            console.log(row.join(" "));
        });
    };

    // Return gameBoard object when the module is called
    return { getBoard, placeMark, printBoard };
};

// Detect a winner
function getWinner (board, activePlayer, row, column) {
    let count = 0;
    const boardArray = board.getBoard();
    // Check the column
    for (let i = 0; i < 3; i++) {
        if (boardArray[i][column].getValue() === activePlayer)  {
            count++;
        }
    }
    if (count === 3) {
        console.log(`${activePlayer} wins!`);
        return true;
    }
    else {
        count = 0;
    }
    // Check the row
    for (let j = 0; j < 3; j++) {
        if (boardArray[row][j].getValue() === activePlayer)  {
            count++;
        }
    }
    if (count === 3) {
        console.log(`${activePlayer} wins!`);
        return true;
    }
    else {
        count = 0;
    }
    // Check the left diagonal
    if (row === column) {
        for  (let i = 0, j = 0; i < 3 && j < 3; i++, j++) {
            if (boardArray[i][j].getValue() === activePlayer) {
                count++;
            }
        }
        if (count === 3) {
            console.log(`${activePlayer} wins!`)
            return true;
        }
        else {
            count = 0;
        }
    }
    // Check the right diagonal
    if ((row === 0 && column === 2) || (row === column) || (row === 2 && column === 0)) {
        for (let i = 0, j = 2; i < 3 && j >= 0; i++, j--) {
            if (boardArray[i][j].getValue() === activePlayer) {
                count++;
            }
        }
        if (count === 3) {
            console.log(`${activePlayer} wins!`)
            return true;
        }
        else {
            count = 0;
        }
    return false;
    }
}

// Given a board state, determine optimal move
const minimax = (board, activePlayer) => {
    // Assign a score to each possible move
    // A win is 10 points, a loss is -10 points, a draw is 0 points
    const boardArray = board.getBoard();

    // Choose the move with the highest score

    return { row, column }
}

// Module to control game flow
const gameController = () => {
    playerOne = "X";
    playerTwo = "O";
    
    const board = gameBoard();

    let activePlayer = playerOne;

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${activePlayer}'s turn`);
    }

    // Method to switch player
    const switchPlayerTurn = () => {
        // If active player is playerOne, switch to playerTwo
       activePlayer = (activePlayer === playerOne) ? playerTwo : playerOne;
    }


    // Place a mark, print the updated board, then switch players
    const playRound = (row, column) => {
        // Place mark. If invalid placement, re-prompt for placement.
        if (!board.placeMark(row, column, activePlayer)) {
            printNewRound();
        };

        // Check for winner. If activePlayer didn't win, switch turns.
        if (!getWinner(board, activePlayer, row, column)) {
            switchPlayerTurn();
            printNewRound();
        };
    }

    // Print the initial turn
    printNewRound();

    return {
        getActivePlayer,
        playRound,
        printNewRound
    };
}



const game = gameController();
