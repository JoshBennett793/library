let myLibrary = [];
let modalDiv = document.createElement("div");

const addBookBtn = document.querySelector("#addBookBtn");
const addBookModal = document.querySelector(".addBookModal");
const cardContainer = document.querySelector(".card-container");
const addBookForm = document.querySelector(".addBookForm");
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readCheckbox = document.querySelector("#read");
const submitBtn = document.querySelector(".submit");

const book = {
  init: function (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    return this;
  },
};

function emptyModal() {
  addBookForm.reset();
}

function toggleModal() {
  if (addBookModal.style.visibility == "hidden") {
    addBookModal.style.visibility = "visible";
    modalDiv.classList.add("modal-body-overlay");
    document.body.appendChild(modalDiv);
  } else {
    addBookModal.style.visibility = "hidden";
    modalDiv.remove();
  }
}

addBookBtn.addEventListener("click", toggleModal);
modalDiv.addEventListener("click", toggleModal);

function createCard(book) {
  const bookCard = document.createElement("div");
  const titleP = document.createElement("p");
  const authorP = document.createElement("p");
  const pagesP = document.createElement("p");
  const readBtn = document.createElement("button");
  const removeBtn = document.createElement("button");

  bookCard.classList.add("book-card");
  titleP.classList.add("title");
  authorP.classList.add("author");
  pagesP.classList.add("pages");
  removeBtn.classList.add("btn", "remove");

  titleP.innerText = `"${book.title}"`;
  authorP.innerText = book.author;
  pagesP.innerText = `${book.pages} pages`;
  removeBtn.innerText = "Remove";

  if (book.read === true) {
    readBtn.classList.add("btn", "read", "read-btn");
    readBtn.innerText = "Read";
  } else if (book.read === false) {
    readBtn.classList.add("btn", "unread", "read-btn");
    readBtn.innerText = "Unread";
  }

  bookCard.appendChild(titleP);
  bookCard.appendChild(authorP);
  bookCard.appendChild(pagesP);
  bookCard.appendChild(readBtn);
  bookCard.appendChild(removeBtn);
  cardContainer.appendChild(bookCard);
}

function removeCard(event) {
  let element = event.target;
  let elIndex = element.closest(".book-card").dataset.index;
  if (element.classList.contains("remove")) {
    for (const [i] of myLibrary.entries()) {
      if (i == elIndex) {
        myLibrary.splice(i, 1);
        postBooksToDOM();
      }
    }
  }
}

cardContainer.addEventListener("click", removeCard);

function changeReadStatus(event) {
  let element = event.target;
  let elIndex = element.closest(".book-card").dataset.index;
  if (element.classList.contains("read-btn")) {
    for (const [i] of myLibrary.entries()) {
      if (i == elIndex) {
        if (element.classList.contains("read")) {
          myLibrary[i].read = false;
        } else {
          myLibrary[i].read = true;
        }
        postBooksToDOM();
      }
    }
  }
}

cardContainer.addEventListener("click", changeReadStatus);

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function setDataAttr() {
  const card = document.querySelectorAll(".book-card");
  card.forEach((element, index) => {
    element.setAttribute("data-index", index);
  });
}

function postBooksToDOM() {
  cardContainer.innerHTML = "";
  myLibrary.forEach((book) => {
    createCard(book);
    setDataAttr();
  });
}

submitBtn.addEventListener("click", () => {
  if (readCheckbox.checked) {
    read = true;
  } else {
    read = false;
  }
  const newBook = Object.create(book).init(
    titleInput.value,
    authorInput.value,
    pagesInput.value,
    read
  );
  emptyModal();
  toggleModal();
  addBookToLibrary(newBook);
  postBooksToDOM();
});
