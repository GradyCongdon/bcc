class Player {
  constructor() {
    this.buttons = {};
    this.buttons.play = di('player-play');
    this.buttons.shuffle = di('player-shuffle');
  }
  play() {
  }
}

function di(id) {
  return document.getElementById(id);
}

function chromeAction(page) {
  return (callback) => {
    chrome.windows.getCurrent(function (currentWindow) {
      chrome.tabs.query(page.query, (tabs) => {
        chrome.tabs.executeScript(tabs[0].id, {file: page.script, allFrames: true}, callback);
      });
    });
  }
}

const bandcamp = {
  query: {
    url: 'https://*.bandcamp.com/*'
  },
  script: 'bs.js',
}

const pageAction = chromeAction(bandcamp);

Object.keys(player.buttons).forEach(key => {
  const elem = player.buttons[key];
  elem.addEventListener('click', player[key]);
});


