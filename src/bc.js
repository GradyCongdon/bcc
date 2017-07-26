import Bandcamp from'./Bandcamp.js';

const bc = new Bandcamp();
const port = chrome.runtime.connect();

window.addEventListener('message', (event) => {
  console.log(event);
}, false);

chrome.runtime.onConnect.addListener(port => console.log(port));

console.log("we're in");



