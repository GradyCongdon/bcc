export default class Chrome {
  constructor(page) {
    this.page = page;
    this.chrome = chrome;
  }

  openSite() {
    chrome.tabs.create({ url: this.page.site });
  }

  send(message) {
    const query = this.page.query;
    const script = this.page.script;
    try {
      chrome.windows.getCurrent((currentWindow) => {
        chrome.tabs.query(query, (tabs) => {
          if (!tabs.length) {
            this.openSite();
          }
          const tabId = tabs[0].id;
          this.sendMessage(tabId, message);
          //console.log(chrome.tabs.connect(tabId, {}));
        });
      });
    } catch (e) {
      console.error(e);
    }
  }
  sendMessage(id, message) {
    console.debug(message);
    chrome.tabs.sendMessage(id, message);
  }

}
