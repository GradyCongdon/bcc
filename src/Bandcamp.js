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
    }
    console.log('construciton finsihed');
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
  }
  pause() {
    console.debug('bc pause');
    let index = this.indexCheck(this.getTrackIndex());
    this.playButtons[index].click();
    this.state.lastPlayed = index;
  }
  next() {
    console.debug('bc next');
    let index = this.getTrackIndex();
    index = index + 1;
    this.playButtons[index].click();
    this.state.lastPlayed = index;
  }
  previous() {
    console.debug('bc prev');
    let index = this.getTrackIndex();
    index = index - 1;
    this.playButtons[index].click();
    this.state.lastPlayed = index;
  }
}
  


export const bandcampPage = {
  query: {
    url: 'https://*.bandcamp.com/*'
  },
  script: 'bc.js',
  site: 'https://bandcamp.com',
}
