import { createDeck } from './deckFactory';

export function createPlayer(name, deckHash) {
  var deck = createDeck(deckHash);

  return {
    name,
    commander: deck.commander,
    deck: deck.units,
    hand: []
  };
}
