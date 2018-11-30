import { createField } from './fieldFactory';
import { createPlayer } from './playerFactory';

export function createMatchInfo(playerHash, cpuHash) {
  var fields = [
    ['player', playerHash],
    ['cpu', cpuHash]
  ].map(args => createPlayer.apply(null, args))
    .map(createField);

  return { fields  };
}
