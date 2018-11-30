import { createUnit } from './../unitFactory/unitFactory';

export function createField(player) {
  return {
    player: player,
    commander: createUnit(player.commander),
    units: [],
    deck: player.deck.map(createUnit)
  };
}
