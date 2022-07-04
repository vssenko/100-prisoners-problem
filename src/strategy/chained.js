module.exports = class ChainedStrategy {
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
    let lastOpenBoxResult = this._prisoner.number;
    for (let currentAttempt = 0; currentAttempt < this._prisoner.attemptsCount; currentAttempt++) {
      const openedValue = this._room.openBox(lastOpenBoxResult);
      if (openedValue === this._prisoner.number) {
        return true;
      }

      lastOpenBoxResult = openedValue;
    }

    return false;
  }
};