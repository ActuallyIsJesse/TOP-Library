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
  let newBook = Object.fromEntries(bookData);
  if (newBook.haveRead === "on") {
    newBook.haveRead = true;
  } else {
    newBook.haveRead = false;
  }
  library.push(newBook);
  updateLibrary();
}

function updateLibrary() {
  while (libraryContent.firstChild) {
    libraryContent.removeChild(libraryContent.firstChild);
  }
  for (i = 0; i < library.length; i++) {
    drawBook(library[i], i);
  }
  addDeleteEventListener()
}

function drawBook(book, pos) {
  //This little monster assembles a card in the DOM based on the book that's passed to it
  const wrapper = document.createElement("div");
  wrapper.dataset.index = `${pos}`;
  wrapper.classList.add("card");
  const close = document.createElement("a");
  wrapper.append(close);
  close.innerText = "×";
  close.dataset.index = `${pos}`;
  close.dataset.nonsense = `junk!`;
  close.classList.add("book-delete");
  const title = document.createElement("h1");
  title.innerText = `${book.title}`;
  wrapper.append(title);
  const author = document.createElement("p");
  author.innerText = `${book.author}`;
  wrapper.append(author);
  const year = document.createElement("p");
  year.innerText = `${book.year}`;
  wrapper.append(year);
  const haveRead = document.createElement("input");
  haveRead.type = "checkbox";
  if (book.haveRead) {
    haveRead.checked = true;
  } else {
    haveRead.checked = false;
  }
  haveRead.classList.add("read-checkmark");
  wrapper.append(haveRead);
  libraryContent.append(wrapper);
}

function addDeleteEventListener() {
  const bookDeleteButtons = document.querySelectorAll(".book-delete")
  for (const button of bookDeleteButtons) {
    button.addEventListener("click", (event) => {
      library.splice(event.target.dataset.index, 1)
      updateLibrary();
    });
  }
}

function modalToggle() {
  if (window.getComputedStyle(modal).getPropertyValue("display") === "none") {
    modal.style.setProperty("display", "flex");
  } else {
    modal.style.setProperty("display", "none");
  }
  createBookForm.reset();
}

newBook.addEventListener("click", () => {
  modalToggle();
});

modalClose.addEventListener("click", () => {
  modalToggle();
});

createBookForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addBook(event.target);
  event.target.reset();
  modalToggle();
});