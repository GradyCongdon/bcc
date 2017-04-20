import Player from './Player.js';

const player = new Player();

Object.keys(player.buttons).forEach(key => {
  const elem = player.buttons[key];
  elem.addEventListener('click', player[key]);
});


