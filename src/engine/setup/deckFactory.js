import { base64ToUnitKey } from "../hashing/unitHash";

const maxCommanderID = 499;

export function createDeck(deckHash) {
  var deck = {
    commander: {
      id: 202,
      level: 1,
      runeId: 0
    },
    units: []
  };

  if (deckHash) {
    for (let i = 5; i <= deckHash.length; i += 5) {
      var unitHash = deckHash.slice(i - 5, i);
      var unitKey = base64ToUnitKey(unitHash);
      if (unitKey.id <= maxCommanderID) {
        deck.commander = unitKey;
      } else {
        deck.units.push(unitKey);
      }
    }
  }

  return deck;
}
