export default class Bandcamp {
  constructor() {
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

  }

  shuffle() {
    const shuffleIndex = rand(0, this.playButtons.length)
    this.playButtons[shuffleIndex].click();
  }

  play() {
    this.playButtons[0].click();
  }
}

function rand(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const bandcampPage = {
  query: {
    url: 'https://*.bandcamp.com/*'
  },
  script: 'bc.js',
  site: 'https://bandcamp.com',
}
