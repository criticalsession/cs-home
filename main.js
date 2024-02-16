import './style.scss';

function workYearDiff() {
  const today = new Date();
  document.querySelector('#yearDiff').innerHTML = today.getFullYear() - 2008;
}

let doRandom = true;
const randomChars = 'abcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-={}[]:"|;\\'.split('');
const originalHeader = 'criticalsession'.split('');
let currHeader = 'criticalsession'.split('');
let timer = null;
let iter = 0;
function randomizeHeader() {
  if (!doRandom) {
    document.querySelector('h1').innerHTML = originalHeader.join('');
    return;
  }

  if (iter !== -1) {
    if (iter < 5) {
      ++iter;
    } else {
      iter = -1;
      document.querySelector('#stopRandomLink').style.height = '30px';
    }
  }

  // revert
  for (let i = 0; i < currHeader.length; ++i) {
    if (currHeader[i] != originalHeader[i]) {
      if (Math.floor(Math.random() * 100) > 40) {
        currHeader[i] = originalHeader[i];
      }
    }
  }

  // randomize
  for (let i = 0; i < currHeader.length; ++i) {
    if (Math.floor(Math.random() * 100) > 90) {
      currHeader[i] = randomChars[Math.floor(Math.random() * randomChars.length)];
    }
  }

  // build
  let html = '';
  for (let i = 0; i < currHeader.length; ++i) {
    html += currHeader[i] === originalHeader[i] ? currHeader[i] : `<span>${currHeader[i]}</span>`;
  }

  if (Math.floor(Math.random() * 100) > 90) {
    switch (Math.floor(Math.random() * 5)) {
      case 0:
        html = `<span>[</span>${html}<span>]</span>`;
        break;
      case 1:
        html = `<span>></span>${html}`;
        break;
      case 2:
        html = `<span>${html}</span>`;
        break;
      case 3:
        html = html.toUpperCase();
        break;
      case 4:
        html = `<span>500: server error</span>`;
        break;
    }
  }

  document.querySelector('h1').innerHTML = html;
  if (doRandom) {
    timer = setTimeout(randomizeHeader, Math.floor(Math.random() * 500) + 500);
  }
}

function stopRandom() {
  doRandom = false;
  clearTimeout(timer);
  document.querySelector('h1').innerHTML = 'ok... :(';
  document.querySelector('#stopRandomLink').style.height = 0;
  document.querySelector('#stopRandomComment').style.height = '30px';
  setTimeout(randomizeHeader, 1500);
}

function removeDescription() {}

workYearDiff();
setTimeout(randomizeHeader, 1000);

document.querySelector('#stopRandomLink').onclick = stopRandom;
document.querySelector('#betterDescriptionLink').onclick = removeDescription;
