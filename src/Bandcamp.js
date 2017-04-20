class Bandcamp {
  constructor() {
    this.dataset = JSON.parse(document.getElementById('pagedata').dataset.blob);
    this.playButtons = document.getElementsByClassName('item_link_play_widget');
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
