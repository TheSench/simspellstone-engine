import { createDeck } from './deckFactory';

export function createPlayer(deckHash) {
  var deck = createDeck(deckHash);

  return {
    commander: deck.commander,
    deck: deck.units,
    hand: []
  };
}
