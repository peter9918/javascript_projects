
const myLibrary = [];

const displayLibraryBtn = document.querySelector("#display-library");

const table = document.querySelector("tbody");
const tableHeader = document.querySelector("#table-header");

const openModal = document.querySelector("#open-modal");
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#close-modal");

const form = document.querySelector("#book-form");
const submitForm = document.querySelector("#f-options input");

openModal.addEventListener("click", () => {
    modal.showModal();
});
closeModal.addEventListener("click", () => {
    modal.close();
    form.reset();
});

submitForm.addEventListener("click", (e) => {
    e.preventDefault();
    if (form.checkValidity()){
        formValues = [];
        const inputFields = document.querySelectorAll(".form-field-wrapper input");
        inputFields.forEach((prop) => {
            if (prop.type != "checkbox") {
                formValues.push(prop.value);
        } else {
            formValues.push(prop.checked);
        }
        });
        const newBook = new Book(...formValues);
        myLibrary.push(newBook);

        modal.close();
        form.reset();
        displayLibrary();
    } else {
        window.alert("please fill out required fields");
    }
});

displayLibraryBtn.addEventListener("click", displayLibrary);

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.displayInfo = function() {
      return `${title} by ${author}, ${pages} number of pages, ${read ? "this book is read" : "not read yet"}`;
    }
};

// DUMMY BOOK OBJECTS
// const book1 = new Book("blabla", "Mihai Eminescu", 20, false);
// const book2 = new Book("bla", "Mihai Citea", 90, true);
// myLibrary.push(book1, book2)

function clearTable() {
    document.querySelectorAll("tr").forEach((row) => {        
        if (table.children.length > 1) {
            table.removeChild(table.lastChild);
        }
    });
};

function newRow(obj, parent, extraChildren = []) {
    // create tr element
    const tableRow = document.createElement("tr");
    // set data number = myLibrary object index
    tableRow.dataset.number = `${parent.childNodes.length - 2}`;

    // collect data from Book object and populate table row
    Object.values(obj).forEach((val) => {
        const tableData = document.createElement("td");
        if (typeof val != "function") {
            tableData.textContent = val;
            tableRow.appendChild(tableData);    
        }
    });
    // append extra children to row, if anny
    if (extraChildren.length > 0) {
        extraChildren.forEach((elem) => {
            tableRow.appendChild(elem);
            console.log("!!!!!!!")
        });
    }
    
    return tableRow;
}

function displayLibrary() {
    // clear table content
    clearTable();

    // insert books in table
    if (myLibrary.length > 0) {
        // make table header visible    
        tableHeader.style.visibility = "visible";

        // add each book to table
        myLibrary.forEach((book) => {
            // create delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.classList.add("delete-btn");

            // delete - on click: 
            // remove table row
            // remove book from library
            // refresh library
            deleteBtn.addEventListener("click", () => {
                deleteBtn.parentElement.remove();
                myLibrary.splice(deleteBtn.parentElement.dataset.number, 1);
                displayLibrary();
            });

            // create chenge read button
            const changeReadBtn = document.createElement("button");
            changeReadBtn.innerText = "Switch read";
            changeReadBtn.classList.add("change-read-btn");

            changeReadBtn.addEventListener("click", () => {
                const affectedBook = myLibrary[changeReadBtn.parentElement.dataset.number];
                affectedBook["read"] = !affectedBook["read"];
                displayLibrary();
                // AMBITIOUS!!!
                // // select affected book object
                // const affectedBook = myLibrary[changeReadBtn.parentElement.dataset.number];
                // // change myLibrary value
                // affectedBook["read"] = !affectedBook["read"];
                // // recreate affected row
                // const affectedRow = newRow(affectedBook, table);
                // // replace old row with changed row
                // changeReadBtn.parentElement.replaceWith(affectedRow);
            });

            const tableRow = newRow(book, table, [deleteBtn, changeReadBtn]);
            table.appendChild(tableRow);
        });
    } else {
            alert("Library is empty");
            tableHeader.style.visibility = "hidden";
        }
};
