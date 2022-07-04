const RandomStrategy = require('./strategy/random');
const ChainedStrategy = require('./strategy/chained');

const strategyTypes = {
  random: 'random',
  chained: 'chained'
};

const strategiesBuilderMap = {
  [strategyTypes.random] : RandomStrategy,
  [strategyTypes.chained]: ChainedStrategy
};

module.exports = class Prisoner {
  /**
   * 
   * @param {Object} params
   * @param {Number} params.number
   * @param {Number} params.attemptsCount
   * @param {String} params.strategyType 
   */
  constructor({number, attemptsCount = 50, strategyType}) {
    this.number = number;
    this.attemptsCount = attemptsCount;
    this.passed = false;
    this.finished = false;
    this.strategyType = strategyType;
  }

  /**
   * 
   * @param {import('./room')} room 
   */
  tryFindOwnNumber(room) {
    const Strategy = strategiesBuilderMap[this.strategyType];
    const strategy = new Strategy({prisoner: this, room });

    this.passed = strategy.execute();
    this.finished = true;

    return this.passed;
  }
};

module.exports.strategyTypes = strategyTypes;