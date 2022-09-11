'use strict'
const gotChars = [];
fetch('./json/got.json')
  .then((response) => response.json())
  .catch((error) => console.error(error, 'error reading character file'))
  .then((data) => {
    for (const item of data) {
      if (!item.dead === true) {
        gotChars.push(item);
      }
    }
    displayPortraits();
  });

const displayPortraits = () => {
  const portraits = document.querySelector('.portraits');
  for (let i = 0; i < gotChars.length; i += 1) {
    const gotChar = gotChars[i];
    const templateChar = `
    <div class="portraitBox">
    <p><img src="${gotChar.portrait}" alt="${gotChar.name}"></p>
    <div class="portraitName">${gotChar.name}</div>
</div>`;
    portraits.insertAdjacentHTML('beforeend', templateChar);
  }
};


