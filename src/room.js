const _ = require('lodash');

module.exports = class Room {
  constructor({prisonersCount = 100} = {}) {
    this._boxes = _.shuffle([...Array(prisonersCount).keys()]
    );
  }

  openBox(boxNumber) {
    return this._boxes[boxNumber];
  }
};