// targeting wrapper div
const wrapper = document.querySelector(".wrapper");

// targeting change-squares button
const changeSquares = document.querySelector("#change-squares");

// setting default number of squares per row to 16
let squaresPerRow = 16;

// creating the grid of squares
function createSquares(num){
    while (wrapper.firstChild) {
        wrapper.removeChild(wrapper.lastChild);
    }
    for (i = 0; i < num; i++) {
        let div = document.createElement("div");
        div.classList.add("square");
        div.addEventListener("mouseover", () => {
            div.style.transition = ""
            div.style.backgroundColor = "pink";
        })
        div.addEventListener("mouseout", () => {
            div.style.transition = "background-color 1s ease-in-out"
            div.style.backgroundColor = "#3f3f3f";
        })
        wrapper.appendChild(div);
        div.style.flexBasis = `${640 / (Math.sqrt(num))}px`
    }
}

changeSquares.addEventListener("click", () => {
    squaresPerRow = Number(window.prompt("enter number of squares per row: "));
    if (!isNaN(squaresPerRow)) {
        if (squaresPerRow > 0 && squaresPerRow < 100){
            createSquares(squaresPerRow ** 2);
        } else {
            window.alert("please select a number betwen 0-100");
        }
    } else {
        window.alert("numbers only!")
    }
})



// loading default 16/16 grid when page loads first
document.addEventListener("DOMContentLoaded", createSquares(256));
