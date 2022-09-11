'use strict'
let gotChars = [];
fetch('./json/got.json')
  .then((response) => response.json())
  .catch((error) => console.error(error, 'error reading character file'))
  .then((data) => {
    for (const item of data) {
      if (!item.dead === true) {
        gotChars.push(item);
      }
    }
    sortByNames();
    displayPortraits();
    addPortraitListeners();
    diplayDetails(0)
  });

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
    return 0;
  }
  gotChars.sort(SortArray);
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
    allPortraitBoxes[i].addEventListener('click', () => {diplayDetails(i);
    });
  }
};
