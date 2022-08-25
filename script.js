let myLibrary = [];
let modalDiv = document.createElement("div");

const addBookBtn = document.querySelector("#addBookBtn");
const addBookModal = document.querySelector(".addBookModal");

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
	myLibrary.unshift(book);
}

function createCard() {
	const cardContainer = document.createElement("div")
	cardContainer.classList.add("card-container");
	const bookCard = document.createElement("div");
	bookCard.classList.add("book-card");
	const titleP = document.createElement("p");
	titleP.classList.add("title");
	const authorP = document.createElement("p");
	authorP.classList.add("author");
	const pagesP = document.createElement("p");
	pagesP.classList.add("pages");
	const readBtn = document.createElement("button");
	readBtn.classList.add("read");
	const removeBtn = document.createElement("button");
	removeBtn.classList.add("remove");
}

const theHobbit = Object.create(book).init(
  "The Hobbit",
  "J.R.R. Tolkien",
  295,
  true
);
myLibrary.push(theHobbit);

const bushCraft = Object.create(book).init(
  "Bush Craft",
  "Bob Holtzman",
  256,
  false
);
myLibrary.push(bushCraft);

console.log(myLibrary);

console.log(theHobbit.info());
