const _ = require('lodash');
const Prisoner = require('./prisoner');
const Room = require('./room');


function runEpochesWithSummary({epoches, strategyType, prisonersCount}) {
  console.log(`Start playing ${epoches} games with ${strategyType} strategy and ${prisonersCount} prisoners`);
  const gameResults = [];

  for (let epoch = 0; epoch < epoches; epoch++) {
    gameResults.push(runGame({ strategyType, prisonersCount }));
  }

  const successGameCount = gameResults.filter(gr => gr.allPassed).length;
  const successPercentage = (successGameCount / gameResults.length) * 100;
  const averagePassedPercent = _.mean(gameResults.map(gr => gr.passedPercent));

  console.log(`After playing ${epoches} games:`);
  console.log(`Percent of success games: ${successPercentage}%`);
  console.log(`Number of success games: ${successGameCount}`);
  console.log(`Average passed prisoners percent: ${averagePassedPercent}`);
}


function runGame({ prisonersCount = 100, strategyType = Prisoner.strategyTypes.random } = {}) {
  const prisoners = [];

  const room = new Room({prisonersCount});

  for (let i = 0; i < prisonersCount; i++) {
    prisoners.push(new Prisoner({number: i, strategyType, attemptsCount: prisonersCount / 2}));
  }

  for (let prisoner of prisoners) {
    prisoner.tryFindOwnNumber(room);
  }

  const passedCount = prisoners.filter(p => p.passed && p.finished).length;
  const gameResult = {
    passedCount,
    prisonersCount,
    allPassed: passedCount === prisonersCount,
    passedPercent: (passedCount / prisonersCount) * 100
  };
  return gameResult;
}

module.exports = {
  runGame,
  runEpochesWithSummary
};