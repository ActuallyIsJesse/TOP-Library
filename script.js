const library = [];
const newBook = document.querySelector(".new-book-button");
const libraryContent = document.querySelector(".library-content");
const modal = document.querySelector(".modal");

class Book {
    constructor(title, author, year, haveRead) {
        this.title = title;
        this.author = author;
        this.year = year;
        this.haveRead = haveRead;
    }
}

function updateLibrary() {
    while(library.firstChild){
        library.removeChild(library.firstChild);
    }
    for (i = 0; i < library.length; i++) {
        console.log("");
    }
}

function createBookDom(book) {
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
        modal.style.setProperty('display', 'none')
    }
}

newBook.addEventListener('click', () => {
    modalToggle()
})