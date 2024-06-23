// const { string } = require("mathjs");

let isResult = false;

let result = document.getElementById("result");
let currentCalc = "";

function updateCalc(char) {
    if (isResult == true && !isNaN(char)){
        clearCalc();
        currentCalc = char;
        isResult = false;
    }

    if (result.innerText === "0" && char !== ".") {
        currentCalc = char;
    } else {
        currentCalc += char;
    }
    isResult = false;
    result.innerText = currentCalc;
}

function evalCalc(){
    const evaluation = math.evaluate(currentCalc);
    result.innerText = evaluation;
    currentCalc = evaluation;
    isResult = true;
}

function clearCalc() {
    currentCalc = "";
    result.innerText = "0";
}

console.log(currentCalc)

