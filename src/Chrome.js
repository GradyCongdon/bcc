/*
const bandcamp = {
  query: {
    url: 'https://*.bandcamp.com/*'
  },
  script: 'bs.js',
}
*/

class Chrome {
  constructor(page) {
    this.page = page;
  }
  action(callback) {
    //doAction
    callback();
    return true;
  }

  /* 
   * Actual extension call
  action(callback) {
    chrome.windows.getCurrent(function (currentWindow) {
      chrome.tabs.query(this.page.query, (tabs) => {
        chrome.tabs.executeScript(tabs[0].id, {file: this.page.script, allFrames: true}, callback);
      });
    });
  }
  */

}

// const chrome  = window.chrome;
export default Chrome;
