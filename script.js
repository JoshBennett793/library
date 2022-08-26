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

function emptyModal() {
  addBookForm.reset();
}

addBookBtn.addEventListener("click", toggleModal);
modalDiv.addEventListener("click", toggleModal);

function createCard(book) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  cardContainer.appendChild(bookCard);
  const titleP = document.createElement("p");
  titleP.classList.add("title");
  titleP.innerText = `"${book.title}"`;
  bookCard.appendChild(titleP);
  const authorP = document.createElement("p");
  authorP.classList.add("author");
  authorP.innerText = book.author;
  bookCard.appendChild(authorP);
  const pagesP = document.createElement("p");
  pagesP.classList.add("pages");
  pagesP.innerText = `${book.pages} pages`;
  bookCard.appendChild(pagesP);
  if (book.read === true) {
    const readBtn = document.createElement("button");
    readBtn.classList.add("btn", "read", "read-btn");
    readBtn.innerText = "Read";
    bookCard.appendChild(readBtn);
  } else if (book.read === false) {
    const readBtn = document.createElement("button");
    readBtn.classList.add("btn", "unread", "read-btn");
    readBtn.innerText = "Unread";
    bookCard.appendChild(readBtn);
  }

  const removeBtn = document.createElement("button");
  removeBtn.classList.add("btn", "remove");
  removeBtn.innerText = "Remove";
  bookCard.appendChild(removeBtn);
}

cardContainer.addEventListener("click", removeCard);

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

cardContainer.addEventListener("click", changeReadStatus);

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