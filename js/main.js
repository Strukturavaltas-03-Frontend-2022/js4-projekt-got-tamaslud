'use strict'
let gotChars = [];

const displayPortraits = () => {
  const portraits = document.querySelector('.portraits');
  for (let i = 0; i < gotChars.length; i += 1) {
    const gotChar = gotChars[i];
    const templateChar = `
    <div class="portraitBox" id="p${i}">
    <div><img src="${gotChar.portrait}" alt="${gotChar.name}"></d>
    <div class="portraitName">${gotChar.name}</div>
</div>`;
    portraits.insertAdjacentHTML('beforeend', templateChar);
  }
};

const sortByNames = () => {
  function SortArray(x, y) {
    if (x.name.split(' ').slice(-1) < y.name.split(' ').slice(-1)) { return -1; }
    if (x.name.split(' ').slice(-1) > y.name.split(' ').slice(-1)) { return 1; }
    if (x.name < y.name) { return -1; }
    return 1;
  }
  gotChars.sort(SortArray);
};

const setImgSelected = (index) => {
  const portraits = document.querySelectorAll('.portraitBox img');
  for (let i = 0; i < portraits.length; i += 1) {
    portraits[i].classList.remove('selected');
  }
  portraits[index].classList.add('selected');
};

const diplayDetails = (index) => {
  const asidePicture = document.querySelector('.gotPicture');
  const asideName = document.querySelector('.char--name');
  const asideHouse = document.querySelector('.char--houseimg');
  const asideDetails = document.querySelector('.character--details');
  asidePicture.src = gotChars[index].picture;
  asideName.innerText = `${gotChars[index].name}`;
  asideHouse.src = `./assets/houses/${gotChars[index].house}.PNG`;
  asideDetails.innerText = `${gotChars[index].bio}`;
};

const addPortraitListeners = () => {
  const allPortraitBoxes = document.querySelectorAll('.portraitBox');
  for (let i = 0; i < allPortraitBoxes.length; i += 1) {
    allPortraitBoxes[i].addEventListener('click', () => { 
      diplayDetails(i);
      setImgSelected(i);
    });
  }
};

const searchCharacter = (searchValue) => {
  let found = false;
  const searchValueLC = searchValue.toLowerCase();
  gotChars.forEach((element, index) => {
    const nameLC = element.name.toLowerCase();
    if (nameLC === searchValueLC) {
      setImgSelected(index);
      diplayDetails(index);
      found = true;
    }
  });
  if (!found) {
    document.querySelector('.found').classList.remove('hidden');
    const timeout = setTimeout((() => {
      document.querySelector('.found').classList.add('hidden');
    }), 2000);
  }
};

const search = () => {
  const btnSearch = document.querySelector('.btn__search');
  btnSearch.addEventListener('click', () => {
    const searchValue = document.querySelector('.search__input').value;
    if (searchValue !== '') {
      searchCharacter(searchValue);
      document.querySelector('.search__input').value = '';
    }
  });
};

const errorJSON = () => {
  const portraits = document.querySelector('.portraits');
  const templateChar = '<div class="error">error loading data</div>';
  portraits.insertAdjacentHTML('beforeend', templateChar);
};

function success(response) {
  gotChars = response.filter((item) => !item.dead === true);
  sortByNames();
  displayPortraits();
  addPortraitListeners();
  diplayDetails(0);
  setImgSelected(0);
  search();
}

async function request(url, options = {}) {
  try {
    const response = await fetch(url, options);
    const result = await response.json();
    success(result);
  } catch (error) {
    errorJSON();
  }
}
request('./json/got.json');
