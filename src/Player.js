import Chrome from './Chrome.js';
// const chrome = require('./Chrome.js');

export default class Player {
  constructor() {
    // this.controller = chrome;
    this.controller = new Chrome();
    console.debug(this.controller);
    this.buttons = {};
    this.buttons.play = di('player-play');
    this.buttons.shuffle = di('player-shuffle');
    this.action = {}
    this.action.play = this.controller.play;
    console.log(this.action);
    console.log(typeof this.action.play);
    this.action.play();
  }
  play() {
    this.action.play();
  }
  shuffle() {
    this.contoller.shuffle()
    this.buttons.shuffle.classList.add('active');
  }
    
}

function di(id) {
  return document.getElementById(id);
}

