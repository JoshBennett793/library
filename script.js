let myLibrary = [];
let modalDiv = document.createElement("div");

const addBookBtn = document.querySelector("#addBookBtn");
const addBookModal = document.querySelector(".addBookModal");
const cardContainer = document.querySelector(".card-container");
const cardContainerChildren = document.querySelector(".card-container").childNodes;
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const readCheckbox = document.querySelector("#read");
const submitBtn = document.querySelector(".submit");

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

const book = {
  init: function (title, author, pages, read) {
		this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    return this;
  },
  info: function () {
		return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;
  },
};

function addBookToLibrary(book) {
	myLibrary.push(book);
}

function createCard(book) {
	createCard.prototype = Object.create(book);
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
    readBtn.classList.add("btn", "read");
    readBtn.innerText = "Read";
    bookCard.appendChild(readBtn);
  } else if (book.read === false) {
		const readBtn = document.createElement("button");
    readBtn.classList.add("btn", "unread");
    readBtn.innerText = "Unread";
    bookCard.appendChild(readBtn);
  }
  const removeBtn = document.createElement("button");
  removeBtn.classList.add("btn", "remove");
  removeBtn.innerText = "Remove";
  bookCard.appendChild(removeBtn);
}

function postBooksToDOM() {
	cardContainerChildren.forEach(card => card.remove());
  myLibrary.forEach(createCard);
}

function emptyModal() {
	titleInput.value = "";
	authorInput.value = "";
	pagesInput.value = "";
	readCheckbox.checked = false;
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
		console.log(cardContainerChildren);
	});
	