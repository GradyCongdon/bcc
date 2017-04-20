import Bandcamp from './Bandcamp.js';
import Player from './Player.js';

const bc = new Bandcamp();
const player = new Player(bc);
player.shuffle();
