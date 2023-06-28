const library = [];
const newBook = document.querySelector(".new-book-button");
const libraryContent = document.querySelector(".library-content");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close-button");
const createBookForm = document.querySelector(".create-book-form");

const tempBook1 = {
  title: "The Hobbit",
  author: "Tolkien",
  year: "1937",
  haveRead: true,
};

drawBook(tempBook1);


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
  library.unshift(newBook);
  drawBook(library[0]);
}

function updateLibrary() {
  while (library.firstChild) {
    library.removeChild(library.firstChild);
  }
  for (i = 0; i < library.length; i++) {
    drawBook(library[i]);
  }
}

function drawBook(book) {
  console.log(book);
  const wrapper = document.createElement("div");
  wrapper.dataset.index = "1";
  wrapper.classList.add("card");
  const close = document.createElement("a");
  wrapper.append(close);
  close.innerText = '×';
  close.classList.add("book-delete")
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
  haveRead.classList.add("read-checkmark")
  wrapper.append(haveRead);
  libraryContent.append(wrapper);
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
