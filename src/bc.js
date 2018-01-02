import Bandcamp from'./Bandcamp.js';
import UI from'./UI';

const bc = new Bandcamp();
const ui = new UI();
const port = chrome.runtime.connect();

// chrome.runtime.onConnect.addListener(port => {});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const state = bc.onMessage(message);
  ui.debugState(state);
  console.log('bc onMessage return state');
  console.log(state);
  sendResponse(state);
  return state;
});

console.log("we're in");

window.onload = () => {
  console.log('dom loadeded');
  const buttons = bc.getPlayButtons();
  Array.from(buttons).forEach((button, index) => {
    const updatePlayingIndex = () => {
      console.log(index);
      bc.state.lastPlayed = index;
      ui.debugState(bc.state);
    }
    button.addEventListener('click', updatePlayingIndex);
  });
  console.debug(buttons.length);
};

console.debug(bc.getPlayButtons().length);
console.debug('bc.js done');
