import chai from 'chai';
import assertArrays from 'chai-arrays';
import { createField } from './fieldFactory';
chai.use(assertArrays);
const expect = chai.expect;

describe('fieldFactory', () => {
  describe('createField', () => {
    var commander,
        unit1,
        unit2,
        player,
        field;

    beforeEach(function setupPlayer() {
      commander = { id: 1, level: 1, runeId: null };
      unit1 = {id: 2, level: 1, runeId: null};
      unit2 = {id: 3, level: 1, runeId: null};
      player = {
        commander: commander,
        deck: [unit1, unit2]
      };

      field = createField(player);
    });

    it('should return a field object with empty units array', () => {
      expect(field.units).to.be.array();
      expect(field.units).to.be.ofSize(0);
    });

    it('should return a field object associated with given player', () => {
      expect(field.player).to.equal(player);
    });

    it("should return a field object with a unit for the given player's commander", () => {
      expect(field.commander.unitKey).to.equal(player.commander);
    });
  });
});
