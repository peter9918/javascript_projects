let first = "";
let opperation = "";
let last = "";

let isOpp = false;

const text = document.querySelector(".text");
const clear = document.querySelector("#clear");
const equals = document.querySelector("#equals");
const dot = document.querySelector("#dot");
const nums = document.querySelectorAll(".num");
const opps = document.querySelectorAll(".opp");

function roundNumber(num, scale) {
    if(!("" + num).includes("e")) {
      return +(Math.round(num + "e+" + scale)  + "e-" + scale);
    } else {
      var arr = ("" + num).split("e");
      var sig = ""
      if(+arr[1] + scale > 0) {
        sig = "+";
      }
      return +(Math.round(+arr[0] + "e" + sig + (+arr[1] + scale)) + "e-" + scale);
    }
}

function add(a, b) {
    return (a + b)
};

function subtract(a, b) {
    return (a - b)
};

function multiply(a, b) {
    return (a * b)
};

function divide(a, b) {
    return (a / b)
};

function modulus(a, b) {
    return (a % b); 
};

function operate(first, last, opp) {
    switch (opp) {
        case "+":
            return add(first, last);
        case "-":
            return subtract(first, last);
        case "*":
            return multiply(first, last);
        case "/":
            return divide(first, last);
        case "%":
            return modulus(first, last);
    };
}

function clearText() {
    text.innerHTML = "";
}

function resetText() {
    text.innerHTML = "0";
    [first, last, opperation] = ["", "", ""];
}

function updateText(val) {
    text.innerHTML = val;
}

function resetOppBackground() {
    opps.forEach((opp) => {
        opp.style.backgroundColor = "#2b2bff"
    })
}

function textTooLong(val) {
    if (val.length > 9) {
        return true;
    } else {
        return false;
    }
}

clear.addEventListener("click", () => {
    resetText();
    resetOppBackground();
})

nums.forEach((num) => {
    num.addEventListener("click", () => {
        if (!isOpp){
            if (!textTooLong(first)){      
                first += num.innerHTML;
                updateText(first);
            }
        } else {
            if (!textTooLong(last)) {
                last += num.innerHTML;
                clearText();
                updateText(last);
            }    
        }
    })    
})

dot.addEventListener("click", () => {
    if (!isOpp){
        console.log(first)
        if (!first.includes(".")) {
            first += dot.innerHTML;
            updateText(first);
        }
    } else {
        if (!last.includes(".")) {
            last += dot.innerHTML;
            clearText();
            updateText(last);
        }   
    }
})

equals.addEventListener("click", () => {
    if (last) {
        if (opperation === "/" && last === "0") {
            window.alert("cannot divide by 0")
        } else {
            resetOppBackground();
            const result = roundNumber(operate(Number(first), Number(last), opperation), 4);
            [first, last, opperation] = ["", "", ""];
            first = String(result);
            text.innerHTML = first;
            isOpp = false;
        }
    }
});

opps.forEach((opp) => {
    opp.addEventListener("click", () => {
        if (first && !last && !opperation) {
            opp.style.backgroundColor = "#0000ff";
            opperation = opp.innerHTML;
            isOpp = true;
        }  
    })
})







