const myLibrary = [];
const newBookForm = document.getElementById('newBookForm');
const newtitle = document.getElementById('newTitle');
const newauthor = document.getElementById('newAuthor');
const newpages = document.getElementById('newPages');
const newread = document.getElementById('newRead');
let id = 0;

function Book(title, author, pages, read = false) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  id += 1;
}
// adds book to library
function addBookToLibrary(title, author, pages, read = false) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

// renders the myshelf section and adds all books in myLibrary
function render() {
  const myShelf = document.getElementById('myShelf');
  while (myShelf.firstChild) {
    myShelf.removeChild(myShelf.firstChild);
  }
  myLibrary.forEach(book => {
    const {
      author, title, pages, read, id,
    } = book;

    const bookDiv = document.createElement('div');

    const titleHead = document.createElement('h3');
    titleHead.innerHTML = title;
    bookDiv.appendChild(titleHead);

    const authorText = document.createElement('p');
    authorText.innerHTML = author;
    bookDiv.appendChild(authorText);

    const pageText = document.createElement('p');
    pageText.innerHTML = pages;
    if (read) {
      pageText.innerHTML = `You've read ${pages}`;
    } else {
      pageText.innerHTML = `${pages} to be read`;
    }
    bookDiv.appendChild(pageText);

    const readText = document.createElement('p');
    if (read) {
      readText.innerHTML = 'You already read this one!';
    } else {
      readText.innerHTML = 'Please read!';
    }
    bookDiv.appendChild(readText);

    const buttonDiv = document.createElement('div');
    buttonDiv.innerHTML = `<button onclick="deleteBook(${id})" id="deleteButton">Delete</button>`;
    buttonDiv.innerHTML += `<button onclick="updateBook(${id})" id="updateButton">Read</button>`;
    bookDiv.appendChild(buttonDiv);


    myShelf.appendChild(bookDiv);
  });
}
// opens and closes the form
// eslint-disable-next-line no-unused-vars
const switchForm = () => {
  if (newBookForm.attributes.class.value === 'none') {
    newBookForm.attributes.class.value = 'block';
  } else {
    newBookForm.attributes.class.value = 'none';
  }
};

// deletes book from myLibrary using id
// eslint-disable-next-line no-unused-vars
function deleteBook(id) {
  const findIndex = myLibrary.findIndex(book => book.id === id);

  if (findIndex !== -1) {
    myLibrary.splice(findIndex, 1);
  }
  render();
}

// eslint-disable-next-line no-unused-vars
function updateBook(id) {
  const findIndex = myLibrary.findIndex(book => book.id === id);
  if (myLibrary[findIndex].read === true) {
    myLibrary[findIndex].read = false;
  } else {
    myLibrary[findIndex].read = true;
  }
  render();
}

// adds default books to myLibrary
function displayDefaultBooks() {
  addBookToLibrary("You Don't Know JS Yet: Get Started", 'Kyle Simpson', 145, false);
  addBookToLibrary("You Don't Know JS Yet: Scope & closures", 'Kyle Simpson', 281, false);
  addBookToLibrary("You Don't Know JS Yet: Up & Going", 'Kyle Simpson', 88, false);
  addBookToLibrary("You Don't Know JS Yet: This & object prototypes", 'Kyle Simpson', 174, false);
  addBookToLibrary("You Don't Know JS Yet: Async & performance", 'Kyle Simpson', 296, false);
  addBookToLibrary("You Don't Know JS Yet: ES6 & beyond", 'Kyle Simpson', 278, false);
  addBookToLibrary("You Don't Know JS Yet: Types & grammer", 'Kyle Simpson', 198, false);
  addBookToLibrary("You Don't Know JS Yet: Scopes & closures", 'Kyle Simpson', 98, false);
  render();
}

// send the new book to myLibrary
function sendBook(e) {
  // prevent the submit button from sending the form
  e.preventDefault();
  addBookToLibrary(newtitle.value, newauthor.value, newpages.value, newread.checked);
  render();
  newtitle.value = '';
  newauthor.value = '';
  newpages.value = '';
  newread.value = '';
}
// checks if the submit button is clicked
newBookForm.addEventListener('submit', sendBook);
displayDefaultBooks();