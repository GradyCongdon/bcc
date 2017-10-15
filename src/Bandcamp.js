import { rand } from './util';

export default class Bandcamp {
  constructor() {
    console.debug('construcitoning');
    try {
      this.dataset = JSON.parse(document.getElementById('pagedata').dataset.blob);
    } catch (e) {
      console.error('no page-dataset');
    }
    try {
      this.playButtons = document.getElementsByClassName('item_link_play_widget');
    } catch (e) {
      console.error('no play buttons');
    }
    this.state = {};
    this.actions = ['play', 'pause', 'next', 'previous'];
    this.toggles = ['autoplay', 'shuffle'];
    this.defaults = {
      trackIndex: 0,
    }

  }
  getActions(obj) {
    const keys = Object.keys(obj);
    const actions = keys.filter(key => obj[key] && this.actions.includes(key));
    return actions;
  }
  validateState(obj) {
    // TODO
    return true;
  }
  addDefaultState(obj) {
    return Object.assign({}, this.defaults, obj)
  }
  setState(obj) {
    const valid = this.validateState(obj);
    if (!valid) {
      throw new Error('invalid bc state');
    }
    this.state = this.addDefaultState(obj);
    this.callActions();
  }
  callActions() {
    const actions = this.getActions(this.state);
    actions.forEach(action =>  {
      try {
        this[action]();
      } catch(e) {
        console.error(`no method ${action} on bandcamp class`);
      }
    });
  }
  onMessage(message) {
    this.setState(message);

  }

  shuffle() {
    const shuffleIndex = rand(0, this.playButtons.length)
    this.playButtons[shuffleIndex].click();
  }

  play() {
    console.debug('bc play');
    this.playButtons[this.state.trackIndex].click();
  }
  pause() {
    console.debug('bc pause');
    this.playButtons[this.state.trackIndex].click();
  }
  next() {
    console.debug('bc next');
    this.state.trackIndex = this.state.trackIndex + 1;
    console.log(this.state.trackIndex);
    this.playButtons[this.state.trackIndex].click();
    console.log(this.state.trackIndex);
  }
  previous() {
    console.debug('bc next');
    this.playButtons[this.state.trackIndex].click();
    this.state.trackIndex = this.state.trackIndex - 1;
    this.playButtons[this.state.trackIndex].click();
  }

}
  


export const bandcampPage = {
  query: {
    url: 'https://*.bandcamp.com/*'
  },
  script: 'bc.js',
  site: 'https://bandcamp.com',
}
