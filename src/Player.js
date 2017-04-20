class Player {
  constructor() {
    this.buttons = {};
    this.buttons.play = di('player-play');
    this.buttons.shuffle = di('player-shuffle');
  }
  play() {
    // UI stuff
    // chrome.
    console.log('play');
		chrome.tabs.executeScript({
			code: 'document.body.style.backgroundColor="green"'
		});
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

