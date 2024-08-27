
const boardWrapper = document.querySelector("#board-wrapper");

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
    return { squares, checkWin, checkDraw };
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

const player1 = createPlayer("Player1", "X", true);
const player2 = createPlayer("Player2", "O", false);

const Display = (function() {
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
                    // update game board value
                    console.log("!!!!!!!!!!")
                    if (player1.isTurn) {
                        player1.placeMark(square.attributes["data-count"].nodeValue);
                        if (Gameboard.checkWin()) {
                            console.log(`${player1.mark}'s win`)
                            console.log(Gameboard.squares)
                        } else if (Gameboard.checkDraw()) {
                            console.log("draw");
                        }
                    } else {
                        player2.placeMark(square.attributes["data-count"].nodeValue);
                        if (Gameboard.checkWin()) {
                            console.log(`${player2.mark}'s win`)
                            console.log(Gameboard.squares)
                        } else if (Gameboard.checkDraw()) {
                            console.log("draw");
                        }
                    }
                // switch turns
                player1.isTurn = !player1.isTurn
                player2.isTurn = !player2.isTurn
                }
            });
            counter ++;
            boardWrapper.appendChild(square);
        });
    };

    const updateSquare = function(square) {
        // select all square elements
        const displaySquares = document.querySelectorAll("#board-wrapper div");
        // update display square inner text
        displaySquares[square].innerText = Gameboard.squares[square];
        };
    
    return { displayBoard, updateSquare };
})();

Display.displayBoard(Gameboard.squares);

// const Game = (function() {
    
// })

// player1.placeMark(0);
// player1.placeMark(3);
// player1.placeMark(6);

// console.log(Gameboard.squares);
// console.log(Gameboard.checkWin())
// console.log(Gameboard.checkDraw())