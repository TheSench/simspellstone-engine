import { processTurn } from './turnManager';

export function runSimulation({matchInfo, maxTurns}) {
  let currentPlayer = matchInfo.player1;
  try {
    for (let turn = 0; turn < maxTurns; turn++) {
      processTurn(currentPlayer, matchInfo);
      currentPlayer = ~currentPlayer;
    }
  } catch (commanderDied) {
    // TODO: Process results
  }
}
