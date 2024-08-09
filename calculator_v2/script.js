let first;
let opp;
let last;

function add(a, b) {
    return (a + b)
}

function subtract(a, b) {
    return (a - b)
}

function multiply(a, b) {
    return (a * b)
}

function divide(a, b) {
    return (a / b)
}

function operate(first, opp, last) {
    switch (opp) {
        case "+":
            return add(first, last);
        case "-":
            return subtract(first, last);
        case "*":
            return multiply(first, last);
        case "/":
            return divide(first, last);
    };
}

console.log(operate(10, "-", 2));




