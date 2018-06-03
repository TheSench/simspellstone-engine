import chai from 'chai';
import assertArrays from 'chai-arrays';
import { unitKeyToBase64 } from '../hashing/unitHash';
import { createDeck } from './deckFactory';
chai.use(assertArrays);
const expect = chai.expect;

describe('deckFactory', () => {
  describe('createDeck', () => {
    it('should return a deck object with a commander and units', () => {
      var deck = createDeck();

      expect(deck.commander).to.exist;
      expect(deck.units).to.be.array();
    });

    it('should default to "Elaria Captain" as the commander', () => {
      var deck = createDeck();

      expect(deck.commander.id).to.equal(202);
    });

    it('should only process a unitHash if it is 5 characters long', () => {
      var deck1 = createDeck("asda");
      var deck2 = createDeck(unitKeyToBase64({id: 7, level: 3, runeId: 0}));
      var deck3 = createDeck(unitKeyToBase64({id: 7, level: 3, runeId: 0}) + "asda");

      expect(deck1.commander.id).to.equal(202);
      expect(deck1.units).to.be.ofSize(0);
      expect(deck2.commander.id).to.equal(7);
      expect(deck2.units).to.be.ofSize(0);
      expect(deck3.commander.id).to.equal(7);
      expect(deck3.units).to.be.ofSize(0);
    });

    it('should return a deck matching the hash passed in', () => {
      var commander = {id: 7, level: 3, runeId: 0};
      var unit1 = {id: 1005, level: 3, runeId: 0};
      var unit2 = {id: 1015, level: 2, runeId: 0};

      var deck = createDeck(unitKeyToBase64(commander) + unitKeyToBase64(unit1) + unitKeyToBase64(unit2));

      expect(deck.commander.id).to.equal(commander.id);
      expect(deck.commander.level).to.equal(commander.level);
      expect(deck.units[0].id).to.equal(unit1.id);
      expect(deck.units[0].level).to.equal(unit1.level);
      expect(deck.units[1].id).to.equal(unit2.id);
      expect(deck.units[1].level).to.equal(unit2.level);
    });
  });
});
