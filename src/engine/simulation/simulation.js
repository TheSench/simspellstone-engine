import { processTurn } from './turnManager';

export function runSimulation(maxTurns) {
  for(let turn = 0; turn < maxTurns; turn++) {
    processTurn();
  }
}
