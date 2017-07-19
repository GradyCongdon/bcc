import Chrome from './Chrome.js';
import Player from './Player.js';

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

const actor = new Chrome({});
const player = new Player(actor);
addClickListeners(player.buttons, player);

