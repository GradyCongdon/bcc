export default class Chrome {
  constructor(page) {
    this.page = page;
    this.chrome = chrome;
  }

  openSite() {
    chrome.tabs.create({ url: this.page.site });
  }

  action(callback) {
    const query = this.page.query;
    const script = this.page.script;
    try {
      chrome.windows.getCurrent((currentWindow) => {
        chrome.tabs.query(query, (tabs) => {
          if (!tabs.length) {
            this.openSite();
          }
          console.log(chrome.tabs.connect(tabs[0].id, {}));
          chrome.tabs.sendMessage(tabs[0].id, 'play');
        });
      });
    } catch (e) {
      console.error(e);
    }
  }

  

}
