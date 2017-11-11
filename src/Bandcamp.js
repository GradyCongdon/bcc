import { rand } from './util';

export default class Bandcamp {
  constructor() {
    console.debug('construcitoning');
    this.dataset = this.getDataset;
    this.playButtons = this.getPlayButtons();
    this.collection = this.getCollection();
    this.actions = ['play', 'pause', 'next', 'previous'];
    this.toggles = ['autoplay', 'shuffle'];
    this.state = {
      lastPlayed: 0,
      play: false,
      pause: false,
      next: false,
      previous: false,
      autoplay: false,
      shuffle: false,
    }
    console.debug('construciton finsihed');
  }
  getTrackIndex(track = null) {
    if (!track) {
      track = this.getPlayingTrack() || this.getLastPlayedTrack();
    }
    let index =  this.collection.indexOf(track);
    return index;
  }
  getPlayingTrack() {
    const track = this.filterCollectionbyClass('playing');
    return track[0];
  }
  getLastPlayedTrack() {
    const lastPlayed =  this.state.lastPlayed;
    return this.collection[lastPlayed];
  }
  filterCollectionbyClass(className = null) {
    if (!className) {
      return this.collection;
    }
    return this.collection.filter(item => Array.from(item.classList).includes(className));
  }
  getPlayButtons() {
    try {
      return Array.from(document.getElementsByClassName('item_link_play_widget'));
    } catch (e) {
      console.error('no play buttons');
      return [];
    }
  }
  getCollection() {
    try {
      return Array.from(document.getElementsByClassName('collection-item-container'));
    } catch (e) {
      console.error('no collection items');
      return [];
    }
  }
  getDataset() {
    try {
      return JSON.parse(document.getElementById('pagedata').dataset.blob);
    } catch (e) {
      console.error('no page-dataset');
      return {};
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
    return Object.assign({}, this.state, obj);
  }
  setState(obj) {
    const valid = this.validateState(obj);
    if (!valid) {
      throw new Error('invalid bc state');
    }
    this.state = this.addDefaultState(obj);
    return this.state;
  }
  callActions() {
    const actions = this.getActions();
    actions.forEach(action =>  {
      try {
        this[action]();
      } catch(e) {
        console.error(`no method ${action} on bandcamp class`);
      }
    });
    return this.state;
  }
  onMessage(message) {
    this.setState(message);
    this.callActions();
    console.debug('bc onMessage final state');
    console.debug(this.state);
    return this.state;
  }
  shuffle() {
    const shuffleIndex = rand(0, this.playButtons.length)
    this.playButtons[shuffleIndex].click();
  }
  indexCheck(index) {
    if (index === -1) {
      return 0;
    }
    return index;
  }
  play() {
    console.debug('bc play');
    let index = this.indexCheck(this.getTrackIndex());
    this.playButtons[index].click();
    this.state.lastPlayed = index;
    this.state.play = false
  }
  pause() {
    console.debug('bc pause');
    let index = this.indexCheck(this.getTrackIndex());
    this.playButtons[index].click();
    this.state.lastPlayed = index;
    this.state.pause = false
  }
  next() {
    console.debug('bc next');
    let index = this.getTrackIndex();
    index = index + 1;
    this.playButtons[index].click();
    this.state.lastPlayed = index;
    this.state.next = false
  }
  previous() {
    console.debug('bc prev');
    let index = this.getTrackIndex();
    index = index - 1;
    this.playButtons[index].click();
    this.state.lastPlayed = index;
    this.state.previous = false
  }
}
  


export const bandcampPage = {
  query: {
    url: 'https://*.bandcamp.com/*'
  },
  script: 'bc.js',
  site: 'https://bandcamp.com',
}
