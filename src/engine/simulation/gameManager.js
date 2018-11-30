import { createField } from './../setup/fieldFactory';
import { createPlayer } from './../setup/playerFactory';

export function createGame(playerHash, cpuHash) {
  var fields = [
    ['player', playerHash],
    ['cpu', cpuHash]
  ].map(args => createPlayer.apply(null, args))
    .map(createField);

  return { fields  };
}
