export default class Chrome {
  constructor(page) {
    this.page = page;
    this.chrome = chrome;
  }

  openSite() {
    chrome.tabs.create({ url: this.page.site });
  }

  async send(message) {
    const query = this.page.query;
    const script = this.page.script;
    let promise = null;
    try {
      const win = await this.getWindow();
      console.debug('win');
      console.debug(win);
      const tab = await this.getTab(query);
      console.debug('tab');
      console.debug(tab);
      const response = await this.sendMessage(tab, message);
      console.debug('response');
      console.debug(response);
      return response;
    } catch (e) {
      console.error(e);
    }
    return promise;
  }
  async getWindow() {
    return new Promise((resolve, reject) => {
      chrome.windows.getCurrent((currentWindow) => {
          resolve(currentWindow);
      });
    });
  }
  async getTab(query) {
    return new Promise((resolve, reject) => {
      chrome.tabs.query(query, (tabs) => {
        if (!tabs.length) {
          reject(`no tabs for ${query.url}`);
        }
        const tabId = tabs[0].id;
        resolve(tabId);
      });
    });
  }
  async sendMessage(id, message) {
    console.debug('send msg:');
    console.debug(message);
    return new Promise((resolve, reject) => {
      chrome.tabs.sendMessage(id, message, (response) => {
        console.debug('response sendMsg:');
        console.debug(response);
        resolve(response);
      });
    });
  }

}
