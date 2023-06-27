const library = [];
const newBook = document.querySelector(".new-book-button");
const libraryContent = document.querySelector(".library-content");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close-button");
const createBookButton = document.querySelector(".create-book-button");
const createBookForm = document.querySelector(".create-book-form");



class Book {
    constructor(title, author, year, haveRead) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.haveRead = haveRead;
    }
}

function addBook(form) {
    const bookData = new FormData(form);
    return Object.fromEntries(bookData);
}

function updateLibrary() {
    while(library.firstChild){
        library.removeChild(library.firstChild);
    }
    for (i = 0; i < library.length; i++) {
        console.log("");
    }
}

function drawBook(book) {
    const wrapper = document.createElement('div');
    const title = document.createElement('h1');
    const author = document.createElement('p');
    const year = document.createElement ('p');
    const haveRead = document.createElement ('p');
}

function modalToggle() {
    if (window.getComputedStyle(modal).getPropertyValue('display') === 'none') {
        modal.style.setProperty('display', 'flex');
    } else {
        modal.style.setProperty('display', 'none');
    }
    modal.reset()

}



newBook.addEventListener('click', () => {
    modalToggle();
})

modalClose.addEventListener('click', () => {
    modalToggle();
})

createBookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addBook(event.target)
    event.target.reset()
    modalToggle();
})