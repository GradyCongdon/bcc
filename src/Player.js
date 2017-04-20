class Player {
  constructor() {
    this.buttons = {};
    this.buttons.play = di('play');
    this.buttons.shuffle = di('shuffle');
  }
  play() {
    // UI stuff
    // chrome.
  }
  shuffle() {
    // UI stuff
    // this.controller.shuffle;
  }
}

function di(id) {
  return document.getElementById(id);
}
export default Player;

