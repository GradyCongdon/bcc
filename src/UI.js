export default class UI {
  debugState(message) {
    this.createPane(JSON.stringify(message));
  }
  createPane(content) {
    const pane = document.createElement('div');
    pane.id = 'bcc-ui-pane';
    pane.classList.add('bcc-ui-pane');
    pane.innerHTML = content;
    document.body.appendChild(pane);
  }
}
