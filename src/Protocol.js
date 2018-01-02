export default class Protocol {
  // Holds state for players, dispatches actions from player to page & back
  constructor(receiver) {
    this.receiver = receiver;
    this.state = {
      controller: {
        playing: false,
        currentAction: null,
        lastAction: null,
        toggles: {
          shuffle: false,
          autoplay: false,
        }
      }
      playlist: {
        currentIndex: null,
        tracks: [
          /*{
           * id: null,
           * name: null,
           * artist: null,
           * album: null,
           * liked: false,
           *},
           */
        ],
      }
    }
  }
  onMessage() {
    let response = null;
    const type = message.type;
    const value = message.value;
    switch (type) {
      case 'ACTION':
        this.lastAction = this.currentAction;
        this.currentAction = value;
        response = this.call(this.currentAction);
        break;
      case 'SET':        
        response = this.set(type, value);
        break;
      default:
        throw new Error(`unknown message type ${type}`);
    }
    return response;
  }
  call(action) {
    return this.receiver[action];
  }
  set(type, value) {
    this.toggles[type] = value;
  }
  messageType(message) {
    switch (message) {
      case 'PLAY':
      case 'PAUSE':
      case 'STOP':
        return 'ACTION';
      case 'SHUFFLE':
      case 'AUTOPLAY':
        return 'TOGGLE';
      default:
        throw new Error(`unknown message type for ${message}`);
    }
  }
}
