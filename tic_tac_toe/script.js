
const boardWrapper = document.querySelector("#board-wrapper");

const Gameboard = (function() {
    const squares = ["","","","","","","","",""];
    const checkWin = function() {
        if (squares[0] && squares[0] === (squares[1] && squares[2]) ||
            squares[3] && squares[3] === (squares[4] && squares[5]) ||
            squares[6] && squares[6] === (squares[7] && squares[8]) ||
            squares[0] && squares[0] === (squares[3] && squares[6]) ||
            squares[1] && squares[1] === (squares[4] && squares[7]) ||
            squares[2] && squares[2] === (squares[5] && squares[8]) ||
            squares[0] && squares[0] === (squares[4] && squares[8]) ||
            squares[2] && squares[2] === (squares[4] && squares[6])
        ) {
            return true;
        } else {
            return false;
        }
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

function createPlayer(name, mark) {
    // place mark in gameboard square if square is empty
    const placeMark = function(square) {
        if (Gameboard.squares[square] === "") {
            Gameboard.squares[square] = mark;
        }
    };
    return {name, mark, placeMark};
};

const Display = (function() {
    const displayBoard = function(board) {
        board.forEach((elem) => {
            const square = document.createElement("div");
            square.innerText = elem;
            boardWrapper.appendChild(square);
        });
    };
    return { displayBoard };
})();

const player1 = createPlayer("Player1", "X");
const player2 = createPlayer("Player2", "O");


player1.placeMark(0);
player1.placeMark(3);
player1.placeMark(6);

Display.displayBoard(Gameboard.squares);


console.log(Gameboard.squares);
console.log(Gameboard.checkWin())
console.log(Gameboard.checkDraw())