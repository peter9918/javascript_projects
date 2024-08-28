
const boardWrapper = document.querySelector("#board-wrapper");
const winningMessageWrapper = document.querySelector("#winning-message-wrapper");

const Gameboard = (function() {
    const squares = ["","","","","","","","",""];
    const winningCombinations = [
        [0, 1, 2], // top row
        [3, 4, 5], // middle row
        [6, 7, 8], // bottom row
        [0, 3, 6], // left column
        [1, 4, 7], // middle column
        [2, 5, 8], // right column
        [0, 4, 8], // main diagonal
        [2, 4, 6]  // anti-diagonal
    ];
    
    const checkWin = function() {
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return true;
            }
        }
        return false;
    };
    
    const checkDraw = function() {
        let draw = true; 
        Object.values(squares).forEach((val) => {
            if (!val) {
                draw = false;
                return draw;
            }
        });
        return draw;
    };

    const clear = function() {
        for (let i = 0; i < squares.length; i++) {
            squares[i] = "";
        };
    }
    return { squares, checkWin, checkDraw, clear };
})();

function createPlayer(name, mark, isTurn) {
    // place mark in gameboard square if square is empty
    const placeMark = function(square) {
            Gameboard.squares[square] = mark;
            // place mark in display board as well 
            Display.updateSquare(square);
    };
    return {name, mark, isTurn, placeMark};
};

const Display = (function() {

    const updateSquare = function(square) {
        // select all square elements
        const displaySquares = document.querySelectorAll("#board-wrapper div");
        // update display square inner text
        displaySquares[square].innerText = Gameboard.squares[square];
        };

    const clear = function() {
        const displaySquares = document.querySelectorAll("#board-wrapper div");
        displaySquares.forEach((square) => {
            square.innerText = "";
        });
    };

    const winningMessage = function(mark, isDraw = false) {
        // create message element
        const message = document.createElement("h2");
        if (isDraw) {
            message.innerText = `DRAW!`;
        } else {
            message.innerText = `${mark}'s WIN!`;
        }
        // create play again button element
        const resetButton = document.createElement("button");
        resetButton.innerText = "Play again";
        resetButton.addEventListener("click", () => {
            // remove children from message wrapper
            winningMessageWrapper.childNodes.forEach(() => {
                winningMessageWrapper.lastChild.remove();
            });
            Game.reset();
        });
        
        winningMessageWrapper.appendChild(message);
        winningMessageWrapper.appendChild(resetButton);
    };

    const displayBoard = function(board) {
        let counter = 0;
        board.forEach((elem) => {
            // create square elem
            const square = document.createElement("div");
            square.innerText = elem;
            square.setAttribute("data-count", counter);
            square.addEventListener("click", () => {
                // check if square is empty
                if (square.innerText === "") {
                    // check who's turn it is
                    if (player1.isTurn) {
                        // place mark
                        player1.placeMark(square.attributes["data-count"].nodeValue);
                        // check for win
                        if (Gameboard.checkWin()) {
                            winningMessage(player1.mark);
                        // check for draw
                        } else if (Gameboard.checkDraw()) {
                            winningMessage(player1.mark, true);
                        }
                    } else {
                        player2.placeMark(square.attributes["data-count"].nodeValue);
                        if (Gameboard.checkWin()) {
                            winningMessage(player2.mark);
                        } else if (Gameboard.checkDraw()) {
                            winningMessage(player2.mark, true);
                        }
                    }
                    // switch turns
                    Game.switchTurns();
                }
            });
            counter ++;
            // insert square in wrapper
            boardWrapper.appendChild(square);
        });
    };
    
    return { displayBoard, updateSquare, clear };
})();

const Game = (function() {
    // switch turns
    const switchTurns = function() {
        player1.isTurn = !player1.isTurn;
        player2.isTurn = !player2.isTurn;
    };
    
    // reset game
    const reset = function() {
        // set x's to be first and o's to be second
        player1.isTurn = true;
        player2.isTurn = false;
        Gameboard.clear();
        Display.clear();
    };

    return { switchTurns, reset };
})();

const player1 = createPlayer("Player1", "X", true);
const player2 = createPlayer("Player2", "O", false);

Display.displayBoard(Gameboard.squares);