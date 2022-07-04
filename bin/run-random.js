const { strategyTypes } = require('../src/prisoner');
const gameRunner = require('../src/gameRunner');

function main() {
  gameRunner.runEpochesWithSummary({
    epoches: 10000,
    strategyType: strategyTypes.random,
    prisonersCount: 100
  });
}

main();