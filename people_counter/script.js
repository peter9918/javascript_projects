let count = 0;
const countEl = document.getElementById("count-el");
const entriesEl = document.getElementById("entries-el");
let entries = [];


function increment(){
    count += 1;
    countEl.innerText = count;
}

function formatEntries(){
    let result = "";
    for (i = 0; i < entries.length; i++){
        result += ` - ${entries[i]}`;
    }
    return result;
}

function save(){
    if (entries.length < 3){
        entries.push(count);
    }
    else{
        entries.push(count);
        entries.shift()
    }
    entriesEl.innerText = formatEntries();
    count = 0;
    countEl.innerText = count;
}

