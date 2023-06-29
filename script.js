const library = [];
const newBook = document.querySelector(".new-book-button");
const libraryContent = document.querySelector(".library-content");
const modal = document.querySelector(".modal");
const modalClose = document.querySelector(".modal-close-button");
const createBookForm = document.querySelector(".create-book-form");
const modalBackground = document.querySelector(".modal-background");

class Book {
  constructor(title, author, year, pages, haveRead) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
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
  addDeleteEventListener();
  updateReadStatus();
}

function drawBook(book, pos) {
  //This little monster assembles a card in the DOM based on the book that's passed to it
  const wrapper = document.createElement("div");
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
  author.innerText = `Author: ${book.author}`;
  wrapper.append(author);
  const year = document.createElement("p");
  year.innerText = `Year Published: ${book.year}`;
  wrapper.append(year);
  const pages = document.createElement("p");
  pages.innerText = `Pages: ${book.pages}`;
  wrapper.append(pages);
  const checkboxWrapper = document.createElement("div");
  const checkboxLabel = document.createElement("label")
  checkboxLabel.innerText = "I've read this: "
  checkboxLabel.setAttribute("for", `LibraryHaveRead${pos}`);
  checkboxWrapper.appendChild(checkboxLabel);
  const haveRead = document.createElement("input");
  haveRead.setAttribute("id", `LibraryHaveRead${pos}`)
  haveRead.dataset.index = `${pos}`;
  haveRead.classList.add("read-status");
  haveRead.type = "checkbox";
  if (book.haveRead) {
    haveRead.checked = true;
  } else {
    haveRead.checked = false;
  }
  haveRead.classList.add("read-checkmark");
  checkboxWrapper.append(haveRead);
  wrapper.append(checkboxWrapper);
  libraryContent.append(wrapper);
}

function addDeleteEventListener() {
  const bookDeleteButtons = document.querySelectorAll(".book-delete");
  for (const button of bookDeleteButtons) {
    button.addEventListener("click", (event) => {
      library.splice(event.target.dataset.index, 1);
      updateLibrary();
    });
  }
}
function updateReadStatus() {
  const displayOnlyElements = document.querySelectorAll(".read-status");
  for (const element of displayOnlyElements) {
    element.addEventListener("change", (event) => {
      const index = event.target.dataset.index;
      console.log(event);
      if (event.target.checked) {
        library[index].haveRead = true;
      } else {
        library[index].haveRead = false;
      }
    });
  }
}

function modalToggle() {
  if (window.getComputedStyle(modal).getPropertyValue("display") === "none") {
    modal.style.setProperty("display", "flex");
    modal.style.setProperty("opacity", "100")
    modalBackground.style.setProperty("opacity", "100")
  } else {
    modalBackground.style.setProperty("opacity", "0")
    modal.style.setProperty("opacity", "0")
    setTimeout(modal.style.setProperty("display", "none"), 200);
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
