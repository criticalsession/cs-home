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

  if (Math.floor(Math.random() * 100) > 80) {
    switch (Math.floor(Math.random() * 6)) {
      case 0:
        html = `<span>[</span>${html}<span>]</span>`;
        break;
      case 1:
        html = `<span>></span>${html}`;
        break;
      case 2:
        html = `<span>500: server error</span>`;
        break;
      case 3:
        html = `<span>  (╯°□°)╯︵ ┻━┻ </span>`;
        break;
      case 4:
        html = `<span>   send help   </span>`;
        break;
      case 5:
        html = `<span>'*.,.*'¨'*.,.*'</span>`;
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
  setTimeout(() => {
    document.querySelector('#stopRandomComment').style.height = '30px';
    randomizeHeader();
  }, 1500);
}

let replacingDescription = false;
const originalDescription = `Hi, I'm a guy who likes building things that run on computers &mdash; software, websites, that
      sort of thing &mdash; and I've been doing that since 2008 (<span id="yearDiff"></span> years ~wow).<br/><br/>I work with
      C# and Vue primarily, but have recently fallen in love with Go.`;
function removeDescription() {
  const cursor = document.getElementById('cursor');
  if (cursor !== null) {
    cursor.remove();
  }
  const el = document.querySelector('#description');
  const p = el.innerHTML.split(' ').slice(0, -1);
  el.innerHTML = p.join(' ') + '<span id="cursor"></span>';

  if (p.length > 0) {
    setTimeout(removeDescription, 30);
  } else {
    setTimeout(fillWithFormalDescription, 500);
  }
}

const formalDescription = `Greetings,<br/><br/>
I am referred to as Amante Reale, alternatively recognized in the digital sphere under the pseudonym criticalsession. Since
the annum 2008, I have been diligently engaged in the profession of software engineering. Indeed, my experience dates back
to an era characterized by the utilization of tables in website design, a testament to my extensive tenure in this field. During
the considerable period spent in the pursuit of my profession, I have acquired a multitude of skills and knowledge, with particular
emphasis on the development of application programming interfaces (APIs) as well as the creation of practical tools and utilities.
<br/><br/>
My work is predominantly conducted utilizing C# and Vue, though I have recently embarked on an exploration of the Go programming
language. My passions include the composition of command-line interface (CLI) tools, the examination of code authored by
others, and the meticulous crafting of README files and documentation.`.split(' ');
let currDescriptionPos = 0;
function fillWithFormalDescription() {
  const cursor = document.getElementById('cursor');
  if (cursor !== null) {
    cursor.remove();
  }
  const el = document.querySelector('#description');
  const word = formalDescription[currDescriptionPos];
  el.innerHTML = el.innerHTML + ' ' + word + '<span id="cursor"></span>';

  if (currDescriptionPos < formalDescription.length - 1) {
    currDescriptionPos++;
    setTimeout(fillWithFormalDescription, 10);
    return;
  }

  const link = document.querySelector('#betterDescriptionLink');
  link.innerHTML = 'oh god no, go back!';
  link.onclick = revertDescription;
  replacingDescription = false;
  currDescriptionPos = 0;
}

function revertDescription() {
  document.querySelector('#description').innerHTML = originalDescription + '<span id="cursor"></span>';
  workYearDiff();
  const link = document.querySelector('#betterDescriptionLink');
  link.innerHTML = 'click here';
  link.onclick = () => {
    if (!replacingDescription) {
      removeDescription();
    }

    replacingDescription = true;
  };
}

let currentTheme = 0;
const themes = [
  {
    themeClass: '',
    iconClass: 'moon',
  },
  {
    themeClass: 'light',
    iconClass: 'sun',
  },
  {
    themeClass: 'matrix',
    iconClass: 'code',
  },
  {
    themeClass: 'text',
    iconClass: 'pen-fancy',
  },
  {
    themeClass: 'dance',
    iconClass: 'face-smile',
  },
];
function setNextTheme() {
  const body = document.querySelector('body');

  if (currentTheme >= 0) {
    document.querySelector(`.fa-solid.fa-${themes[currentTheme].iconClass}`).style.display = 'none';
  }

  if (currentTheme === 4) {
    clearTimeout(jiggleTimer);

    document.querySelectorAll('.container *').forEach((p) => {
      p.style.removeProperty('transform');
      p.style.removeProperty('margin-top');
    });
  }

  currentTheme++;
  if (currentTheme > themes.length - 1) {
    currentTheme = 0;
  }

  body.classList = themes[currentTheme].themeClass;
  document.querySelector(`.fa-solid.fa-${themes[currentTheme].iconClass}`).style.display = 'inline';

  if (themes[currentTheme].themeClass === 'dance') {
    jiggle();
  }
}

let jiggleTimer = null;
function jiggle() {
  document.querySelectorAll('.container *:not(header):not(.theme-select)').forEach((p) => {
    p.style.transform = `rotate(${Math.floor(Math.random() * 14) - 7}deg)`;
    p.style.marginTop = `${Math.floor(Math.random() * 20)}px`;
  });

  jiggleTimer = setTimeout(jiggle, 500);
}

workYearDiff();
setTimeout(randomizeHeader, 1000);

document.querySelector('#stopRandomLink').onclick = stopRandom;
document.querySelector('#betterDescriptionLink').onclick = () => {
  if (!replacingDescription) {
    removeDescription();
  }

  replacingDescription = true;
};

document.querySelector('.theme-select').onclick = () => {
  setNextTheme();
};
