

// select wrappers
const boardWrapper = document.querySelector("#board-wrapper");
const winningMessageWrapper = document.querySelector("#winning-message-wrapper");

// select player 1 info
const player1DisplayWrapper = document.querySelector("#player1-wrapper");
const player1DisplayName = document.querySelector("#player1-name");
const player1DisplayMark = document.querySelector("#player1-mark");
const player1DisplayScore = document.querySelector("#player1-score");

// select player 2 info
const player2DisplayWrapper = document.querySelector("#player2-wrapper");
const player2DisplayName = document.querySelector("#player2-name");
const player2DisplayMark = document.querySelector("#player2-mark");
const player2DisplayScore = document.querySelector("#player2-score");

const Gameboard = (function() {
    // define logical board
    const squares = ["","","","","","","","",""];

    // define winning combinations
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
        // loop trough winning combinations
        // return true if one is found, return false otherwise
        for (let i = 0; i < winningCombinations.length; i++) {
            const [a, b, c] = winningCombinations[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return true;
            }
        }
        return false;
    };
    
    const checkDraw = function() {
        // check if there is no win on board
        if (!checkWin()) {
            // check if the board is full
            let draw = true; 
            Object.values(squares).forEach((val) => {
                if (!val) {
                    draw = false;
                    return draw;
                }
            });
            return draw;
        }
    };

    // clear logical game board
    const clear = function() {
        for (let i = 0; i < squares.length; i++) {
            squares[i] = "";
        };
    };

    return { squares, checkWin, checkDraw, clear };
})();

function Player(name, mark, isTurn) {
    this.score = 0;
    this.name = name;
    this.mark = mark;
    this.isTurn = isTurn;
    // place mark in gameboard square if square is empty
    this.placeMark = function(square) {
            Gameboard.squares[square] = this.mark;
            // place mark in display board as well 
            Display.updateSquare(square);
    };
    // change name method
    this.changeName = function(newName) {
        this.name = newName;
    };
};

const Display = (function() {
    // select change name buttons
    const player1ChangeNameBtn = document.querySelector("#player1-change-name");
    player1ChangeNameBtn.addEventListener("click", () => changeName(player1, player1DisplayName));
    const player2ChangeNameBtn = document.querySelector("#player2-change-name");
    player2ChangeNameBtn.addEventListener("click", () => changeName(player2, player2DisplayName));
    // change name of player
    const changeName = function(player, nameNode) {
        // create wrapper
        const changeNameWrapper = document.createElement("div");
        changeNameWrapper.classList.add("change-name-wrapper");
        // create input for new name
        const changeNameInput = document.createElement("input");
        changeNameInput.value = player.name;
        // create button to confirm name
        const confirmNameBtn = document.createElement("button");
        confirmNameBtn.innerText = "OK";
        confirmNameBtn.addEventListener("click", () => {
            // update player object name and displaay name
            player.name = changeNameInput.value;
            nameNode.innerText = player.name + ":";
            // replace wrapper with new display name
            changeNameWrapper.replaceWith(nameNode);
        });
        // add ellements to wrapper
        changeNameWrapper.append(changeNameInput, confirmNameBtn);
        // replace current display name with wwrapper
        nameNode.replaceWith(changeNameWrapper);
        // focus on input and select value      
        changeNameInput.select()
    };
    // update inner text of a square
    const updateSquare = function(square) {
        // select all square elements
        const displaySquares = document.querySelectorAll("#board-wrapper div");
        // update display square inner text
        displaySquares[square].innerText = Gameboard.squares[square];
        };

    // clear display game board
    const clear = function() {
        const displaySquares = document.querySelectorAll("#board-wrapper div");
        displaySquares.forEach((square) => {
            square.innerText = "";
        });
    };

    // display winning message
    const winningMessage = function(name, isDraw = false) {
        // create message element
        const message = document.createElement("h2");
        if (isDraw) {
            message.innerText = `DRAW!`;
        } else {
            message.innerText = `${name} WINS!`;
        }

        // create play again button element
        const resetButton = document.createElement("button");
        resetButton.innerText = "Play again";
        resetButton.addEventListener("click", () => {
            // remove children from message wrapper
            winningMessageWrapper.childNodes.forEach(() => {
                winningMessageWrapper.lastChild.remove();
            });

            // reset game
            Game.reset();
        });
        
        // append elements to wrapper
        winningMessageWrapper.appendChild(message);
        winningMessageWrapper.appendChild(resetButton);
    };

    const displayBoard = function(board) {
        // counter needed for data-count value of squares
        let counter = 0;

        // create square elements
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
                            winningMessage(player1.name);
                            player1.score ++;
                        // check for draw
                        } else if (Gameboard.checkDraw()) {
                            winningMessage(player1.name, true);
                        } else {
                            // switch turns
                            Game.switchTurns();
                        }
                    } else {
                        player2.placeMark(square.attributes["data-count"].nodeValue);
                        if (Gameboard.checkWin()) {
                            winningMessage(player2.name);
                            player2.score ++;
                        } else if (Gameboard.checkDraw()) {
                            winningMessage(player2.name, true);
                        } else {
                            // switch turns
                            Game.switchTurns();
                        }
                    }
                    
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
    // keep track of turns played
    let turn = 1;

    const switchTurns = function() {
        [player1.isTurn, player2.isTurn] = [player2.isTurn, player1.isTurn];
        player1DisplayWrapper.classList.toggle("players-is-turn");
        player2DisplayWrapper.classList.toggle("players-is-turn");
    };
    
    // reset game
    const reset = function() {
        // increment turn
        turn ++;

        // reset player wrapper classes
        [player1DisplayWrapper.classList, player2DisplayWrapper.classList] = [[], []];
        
        // check if turn is odd
        if (turn % 2 != 0) {
            // set marks
            [player1.mark, player2.mark] = ["X", "O"];
            // set display marks
            [player1DisplayMark.innerText,
            player2DisplayMark.innerText] = [player1.mark, player2.mark];
            // set turn
            [player1.isTurn, player2.isTurn] = [true, false];
            // toggle is turn class
            player1DisplayWrapper.classList.toggle("players-is-turn");
        } else {
            [player1.mark, player2.mark] = ["O", "X"];
            // set display marks
            [player1DisplayMark.innerText,
            player2DisplayMark.innerText] = [player1.mark, player2.mark];
            // set turn
            [player1.isTurn, player2.isTurn] = [false, true];
            // toggle is turn class
            player2DisplayWrapper.classList.toggle("players-is-turn");
        }

        // update players display score
        player1DisplayScore.innerText = player1.score;
        player2DisplayScore.innerText = player2.score;

        // clear logical game board and display game board
        Gameboard.clear();
        Display.clear();
    };

    return { switchTurns, reset };
})();

// create 2 players
const player1 = new Player("PLAYER1", "X", true);
const player2 = new Player("PLAYER2", "O", false);

// display board on page load
Display.displayBoard(Gameboard.squares);
