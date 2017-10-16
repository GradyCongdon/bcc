import { di } from './util';

class Player {
  constructor(actor) {
    this.actor = actor;
    this.state = {
      play: false,
      pause: false,
      next: false,
      previous: false,
      autoplay: false,
      shuffle: false,
    };
    this.buttons = {
      play: di('player-play'),
      pause: di('player-pause'),
      next: di('player-next'),
      previous: di('player-previous'),
      shuffle: di('player-shuffle'),
      autoplay: di('player-autoplay'),
    };
  }
  play() {
    this.state.play = true;
    this.actor.send(this.state);
  }
  pause() {
    this.state.pause = true;
    this.actor.send(this.state);
  }
  next() {
    console.debug('sending next')
    this.state.next = true;
    this.actor.send(this.state);
  }
  previous() {
    this.state.previous = true;
    this.actor.send(this.state);
  }
  shuffle() {
    this.state.shuffle = !this.state.shuffle;
    this.actor.send(this.state);
  }
  autoplay() {
    this.state.autoplay = !this.state.autoplay;
    this.actor.send(this.state);
  }
}

export default Player;
