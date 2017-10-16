import Bandcamp from'./Bandcamp.js';
import UI from'./UI';

const bc = new Bandcamp();
const ui = new UI();
const port = chrome.runtime.connect();

// chrome.runtime.onConnect.addListener(port => {});

chrome.runtime.onMessage.addListener(message => {
  const state = bc.onMessage(message);
  ui.debugState(state);
});

console.log("we're in");





