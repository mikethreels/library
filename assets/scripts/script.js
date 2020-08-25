const myLibrary = [];
const newBookForm = document.getElementById('newBookForm');
const newtitle = document.getElementById('newTitle');
const newauthor = document.getElementById('newAuthor');
const newpages = document.getElementById('newPages');
const newread = document.getElementById('newRead');
let count = 0;
let id = 0;
function Book(title, author, pages, read = false) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  id += 1;
  // this.info = function() {
  //   let str = title + author + "," + pages + "," + read;
  //   return str;
  // }
}

function addBookToLibrary(title, author, pages, read = false) {
  const book = new Book(title, author, pages, read);
  console.log(book)
  myLibrary.push(book);
}

function render() {
  const myShelf = document.getElementById('myShelf');
  while (count < myLibrary.length) {
    count += 1
    const bookDiv = document.createElement('div');

    const titleHead = document.createElement('h3');
    titleHead.innerHTML = myLibrary[count - 1].title;
    bookDiv.appendChild(titleHead);
    
    const authorText = document.createElement('p');
    authorText.innerHTML = myLibrary[count - 1].author;
    bookDiv.appendChild(authorText);

    const pageText = document.createElement('p');
    pageText.innerHTML = myLibrary[count - 1].pages;
    bookDiv.appendChild(pageText);

    const readText = document.createElement('p');
    readText.innerHTML = myLibrary[count - 1].read;
    bookDiv.appendChild(readText);

    myShelf.appendChild(bookDiv);
  }
}

const switchForm = () => {
  if (newBookForm.attributes.class.value === 'none') {
    newBookForm.attributes.class.value = 'block';
  }else {
    newBookForm.attributes.class.value = 'none';
  }
}

function displayDefaultBooks() {
  addBookToLibrary("You Don't Know JS Yet: Get Started", 'Kyle Simpson', 145, false);
  addBookToLibrary("You Don't Know JS Yet: scope & closures", 'Kyle Simpson', 281, false);
  render();
}

function sendBook(e) {
  e.preventDefault();
  addBookToLibrary(newtitle.value, newauthor.value, newpages.value, newread.checked);
  console.log(newtitle.value)
  render();
  newtitle.value = '';
  newauthor.value = '';
  newpages.value = '';
  newread.value = '';
}
console.log(newtitle.value)
newBookForm.addEventListener('submit', sendBook)
displayDefaultBooks();