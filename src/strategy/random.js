const _ = require('lodash');

module.exports = class RandomStrategy {
  /**
   * 
   * @param {Object} params
   * @param {import('../prisoner')} params.prisoner
   * @param {import('../room')} params.room
   */
  constructor({prisoner, room}) {
    this._prisoner = prisoner;
    this._room = room;
  }

  execute() {
    this.pickedNumbers = [];
  
    for (let currentAttempt = 0; currentAttempt < this._prisoner.attemptsCount; currentAttempt++) {
      const boxNumberToOpen = this._getNextNotOpenedBoxNumber();
      this.pickedNumbers.push(boxNumberToOpen);
      const openedValue = this._room.openBox(boxNumberToOpen);
      if (openedValue === this._prisoner.number) {
        return true;
      }
    }

    return false;
  }

  _getNextNotOpenedBoxNumber() {
    let found = false;
    let result;
    while(!found) {
      result = _.random(0, 99);
      if (!this.pickedNumbers.includes(result)){
        found = true;
      }
    }

    return result;
  }
};