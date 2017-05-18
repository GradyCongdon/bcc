const bandcamp = {
  query: {
    url: 'https://*.bandcamp.com/*'
  },
  script: 'bs.js',
}

class Chrome {
  constructor() {
    this.page = bandcamp;
    console.debug(this.page);
  }
  play() {
    const cb = () => console.log('playing');
    action(cb);
  }

  shuffle() {
    console.log('shuffling');
    this.page.shuffle();
  }

}

const chrome  = window.chrome;

function action(callback) {
  chrome.windows.getCurrent(function (currentWindow) {
    chrome.tabs.query(this.page.query, (tabs) => {
      chrome.tabs.executeScript(tabs[0].id, {file: this.page.script, allFrames: true}, callback);
    });
  });
}
export default Chrome;
