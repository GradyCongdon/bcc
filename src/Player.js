class Player {
  constructor(controller) {
    this.controller = controller;
    this.buttons.play = di('play');
    this.buttons.shuffle = di('shuffle');
  }
  play() {
    // UI stuff
    this.controller.play;
  }
  shuffle() {
    // UI stuff
    this.controller.shuffle;
  }
}

function di(id) {
  return document.getElementById(id);
}
export default Player;

