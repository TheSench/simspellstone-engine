import { createField } from './fieldFactory';
import { createPlayer } from './playerFactory';

export function createMatchInfo(playerHash, cpuHash) {
  var players = [
    ['player', playerHash],
    ['cpu', cpuHash]
  ].map(args => createPlayer(...args));

  var [player1, player2] = players;
  player1.opponent = player2;
  player2.opponent = player1;

  return {
    player1,
    player2,
    fields: players.map(createField)
  };
}
