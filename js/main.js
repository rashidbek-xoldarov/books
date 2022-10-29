const lenguageList = document.querySelector(".books__lenguage-list");
const elTemplate = document.querySelector(".site-template").content;
const cardList = document.querySelector(".books__card-list");
const filterSelect = document.querySelector(".book-filter");
const filterList = document.querySelector(".book-filter__list");
const languageItem = document.querySelector(".books__lenguage-list");
const elForm = document.querySelector(".site-header__form");
const elInput = document.querySelector(".form-header__input");
const cardItem = document.querySelector(".card-item");
const bookmarkNum = document.querySelector(".basket-num");
const basketList = document.querySelector(".basket-list");

let lenguageArr = [];
let bookmarkArr = [];
let filteredArr = books;
let filter = false;
let selected = false;
let id = 0;
const lenFragment = new DocumentFragment();
const cardFragment = new DocumentFragment();

const createLanguageList = function () {
  books.forEach((item) => {
    if (!lenguageArr.includes(item.language)) {
      lenguageArr.push(item.language);
    }
  });

  lenguageArr.forEach((len) => {
    const newLi = document.createElement("li");
    newLi.setAttribute("class", "books__lenguage-item");
    newLi.textContent = `${len} (${
      books.filter((item) => item.language === len).length
    })`;
    lenFragment.appendChild(newLi);
  });
  lenguageList.appendChild(lenFragment);
};

createLanguageList();

function renderUI(arr) {
  cardList.innerHTML = "";

  if (arr.length === 0) {
    alert("Sorry, there is no this kind of books");
  }

  arr.forEach((item, index) => {
    const template = elTemplate.cloneNode(true);

    template.querySelector(".card-img").src = item.imageLink;
    template.querySelector(
      ".card-title"
    ).textContent = `${item.author}: ${item.title}`;
    template.querySelector(".card-year").textContent = item.year;
    template.querySelector(".card-page").textContent = item.pages;
    template.querySelector(".card-leguage").textContent = item.language;
    template.querySelector(".card-wikipedia").href = item.link;
    template.querySelector(".card-basket").dataset.bookmarkId = index + 1;
    cardFragment.appendChild(template);
  });
  cardList.appendChild(cardFragment);
}

renderUI(books);
filterSelect.addEventListener("click", function () {
  filterList.classList.toggle("book-filter__list-open");
});

languageItem.addEventListener("click", function (evt) {
  if (evt.target.matches(".books__lenguage-item")) {
    const language = evt.target.textContent.split(" ").slice(0, -1).join(" ");
    if (language === "All") {
      renderUI(books);
    } else {
      if (filter) {
        renderUI(filteredArr.filter((item) => item.language == language));
      } else {
        filteredArr = books.filter((item) => item.language == language);
        selected = true;
        renderUI(filteredArr);
      }
    }
  }
});

elForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  const inputValue = elInput.value.trim();
  const regex = new RegExp(inputValue, "gi");
  if (selected) {
    renderUI(
      filteredArr.filter((item) => {
        return item.title.match(regex);
      })
    );
  } else {
    filteredArr = books.filter((item) => {
      return item.title.match(regex);
    });
    filter = true;
    renderUI(filteredArr);
  }
});

cardList.addEventListener("click", function (evt) {
  if (evt.target.matches(".card-basket")) {
    const id = evt.target.dataset.bookmarkId;
    const index = bookmarkArr.indexOf(books[id - 1]);
    if (!bookmarkArr.includes(books[id - 1])) {
      bookmarkArr.push(books[id - 1]);
    } else {
      bookmarkArr.splice(index, 1);
    }
    evt.target.classList.toggle("bg-orange");
    bookmarkNum.textContent = bookmarkArr.length;
    basketRender(bookmarkArr);
  }
});

function basketRender(arr) {
  basketList.innerHTML = "";
  arr.forEach((item, index) => {
    // create element
    const newLi = document.createElement("li");
    const newImg = document.createElement("img");
    const newP = document.createElement("p");
    const newBtn = document.createElement("button");

    //textContent
    newLi.setAttribute("class", "basket-item");
    newImg.setAttribute("class", "basket-img");
    newP.setAttribute("class", "basket-text");
    newBtn.setAttribute("class", "basket-btn");
    newBtn.dataset.id = index;
    newImg.src = item.imageLink;
    newImg.width = "40";
    newImg.height = "40";
    newP.textContent = item.title;

    //append
    newLi.append(newImg, newP, newBtn);
    basketList.appendChild(newLi);
  });
}

const basketBtn = document.querySelectorAll(".card-basket");

basketList.addEventListener("click", function (evt) {
  if (evt.target.matches(".basket-btn")) {
    const id = evt.target.dataset.id;
    basketBtn[books.indexOf(bookmarkArr[id])].classList.remove("bg-orange");
    bookmarkArr.splice(id, 1);
    basketRender(bookmarkArr);
  }
  bookmarkNum.textContent = bookmarkArr.length;
});
