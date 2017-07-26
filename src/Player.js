import { di } from './util.js';

class Player {
  constructor(actor) {
    this.buttons = {
      play: di('player-play'),
      pause: di('player-pause'),
      next: di('player-next'),
      previous: di('player-previous'),
      shuffle: di('player-shuffle'),
      autoplay: di('player-autoplay'),
    };
    this.toggles = {
      autoplay: true,
      shuffle: false,
    };
    this.actor = actor;
  }
  play() {
    const action = () => console.log('play');
    this.actor.action(action);
  }
  pause() {
    const action = () => console.log('pause');
    this.actor.action(action);
  }
  next() {
    const action = () => console.log('next');
    this.actor.action(action);
  }
  previous() {
    const action = () => console.log('previous');
    this.actor.action(action);
  }
  shuffle() {
    this.toggles.shuffle = !this.toggles.shuffle;
    const action = () => console.log(`shuffle: ${this.toggles.shuffle}`);
    this.actor.action(action);
  }
  autoplay() {
    this.toggles.autoplay = !this.toggles.autoplay;
    const action = () => console.log(`autoplay: ${this.toggles.autoplay}`);
    this.actor.action(action);
  }
}

export default Player;
