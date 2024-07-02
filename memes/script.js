
const jokes = [
    "Hear about the new restaurant called Karma? There's no menu: You get what you deserve.",
    "Why did the hipster burn his mouth? He drank the coffee before it was cool.",
    "Why do French people eat snails? They don't like fast food."
];

const quotes = [
    "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe. - Albert Einstein",
    "Be who you are and say what you feel, because those who mind don't matter, and those who matter don't mind. -  Bernard M. Baruch",
    "You've gotta dance like there's nobody watching, Love like you'll never be hurt, Sing like there's nobody listening, And live like it's heaven on earth. - William W. Purkey"
];

const memes = [
    "https://plaky.com/blog/wp-content/uploads/2023/08/The-bell-curve.jpg",
    "https://plaky.com/blog/wp-content/uploads/2023/08/Javascript.jpg",
    "https://i.ytimg.com/vi/g_Y9ZV-y3bM/sddefault.jpg"
];

const riddles = {
    "I am an odd number. Take away a letter and I become even. What number am I?" : "Seven",
    "What kind of band never plays music?" : "A rubber band",
    "What is cut on a table, but is never eaten?" : "A deck of cards"
}

const pTags = document.querySelectorAll("p");
const parentLeft = document.querySelector(".main-left");
let prevItem;
let prevItem2;
let isNewRiddle = false;

function chooseRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function removePrevious(item){
    if (item){
        item.remove();
    }
}

function insertItem(content, position, tag) {
    if (tag === "p") {
        const pos = pTags.item(position);
        const item = document.createElement(tag);
        item.textContent = content;
        item.classList.add("js-gen");
        parentLeft.insertBefore(item, pos);
        return item;
    } else if (tag === "img") {
        const pos = pTags.item(position);
        const item = document.createElement(tag);
        item.src = content;
        parentLeft.insertBefore(item, pos);
        return item;
    }
}

document.getElementById("joke-gen").onclick = function(){
    removePrevious(prevItem);
    removePrevious(prevItem2);
    prevItem = insertItem(chooseRandom(jokes), 2, "p");
}

document.getElementById("quote-gen").onclick = function(){
    removePrevious(prevItem);
    removePrevious(prevItem2);
    prevItem = insertItem(chooseRandom(quotes), 3, "p");
}

document.getElementById("riddle-gen").onclick = function(){
    isNewRiddle = true;
    removePrevious(prevItem);
    removePrevious(prevItem2);
    randomRiddle = chooseRandom(Object.entries(riddles))
    prevItem = insertItem(randomRiddle[0], 4, "p");

    document.getElementById("riddle-ans-gen").onclick = function(){
        if (isNewRiddle) {
            prevItem2 = insertItem(randomRiddle[1], 5, "p");
            isNewRiddle = false; 
        } else {
            window.alert("please generate a new riddle before revealing answer")
        }      
    }    
}

document.getElementById("riddle-ans-gen").onclick = function() {
    window.alert("please generate a riddle first")
}

document.getElementById("memes-gen").onclick = function(){
    removePrevious(prevItem);
    removePrevious(prevItem2);
    prevItem = insertItem(chooseRandom(memes), 1, "img");
}

