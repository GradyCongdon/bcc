import Chrome from './Chrome.js';
import Player from './Player.js';
import { bandcampPage } from './Bandcamp';

function addClickListeners(nodes, instance) {
  Object.keys(nodes).forEach(key => {
    const elem = nodes[key];
    try {
      elem.addEventListener('click', instance[key].bind(instance));
    } catch (e) {
      console.error(`no element found for ${key}`);
    }
  });
}

console.log(bandcampPage);
const actor = new Chrome(bandcampPage);
const player = new Player(actor);
addClickListeners(player.buttons, player);
