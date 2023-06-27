const library = [];
const newBook = document.querySelector(".new-book-button");
const libraryContent = document.querySelector(".library-content");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close-button");
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
    library.unshift(Object.fromEntries(bookData));
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
    title.innerText = `${book.title}`;
    wrapper.append(title);
    const author = document.createElement('p');
    author.innerText = `${book.author}`;
    wrapper.append(author);
    const year = document.createElement ('p');
    year.innerText = `${book.year}`;
    wrapper.append(year);
    const haveRead = document.createElement ('p');
    haveRead.innerText = `${book.haveRead}`;
    wrapper.append(haveRead);
    libraryContent.append(wrapper)
}

function modalToggle() {
    if (window.getComputedStyle(modal).getPropertyValue('display') === 'none') {
        modal.style.setProperty('display', 'flex');
    } else {
        modal.style.setProperty('display', 'none');
    }
    createBookForm.reset();
}

newBook.addEventListener('click', () => {
    modalToggle();
})

modalClose.addEventListener('click', () => {
    modalToggle();
})

createBookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    addBook(event.target);
    event.target.reset();
    modalToggle();
})