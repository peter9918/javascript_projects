const inputText = document.querySelector("#input");
const addBtn = document.querySelector("#add-item");
const shoppingList = document.querySelector("#shopping-list");

function addNewItem(text) {
    const newItemWrapper = document.createElement("li");
    newItemWrapper.className = "newItemWrapper";
    const newItem = document.createElement("p");
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn"
    deleteBtn.innerText = "Delete";

    deleteBtn.addEventListener("click", () => {
        newItemWrapper.remove();
        inputText.focus();
    })

    newItem.innerText = text;
    newItemWrapper.appendChild(newItem);
    newItemWrapper.appendChild(deleteBtn);
    shoppingList.appendChild(newItemWrapper);
}

addBtn.addEventListener("click", () => {
    if (inputText.value) {
        addNewItem(inputText.value);
    } else {
        alert("please enter an item name.")
    }
    inputText.value = "";
    inputText.focus();   
})

document.addEventListener("beforeunload", (e) => {
    window.alert("lala");
    e.preventDefault();
});

window.addEventListener("beforeunload", (e) => {
    if (shoppingList.innerHTML) {
        e.preventDefault()
        return "";        
    }
    else {console.log("empty")}
});

