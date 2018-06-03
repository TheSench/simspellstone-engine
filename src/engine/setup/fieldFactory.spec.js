import chai from 'chai';
import assertArrays from 'chai-arrays';
import { createField } from './fieldFactory';
chai.use(assertArrays);
const expect = chai.expect;

describe('fieldFactory', () => {
  describe('createField', () => {
    it('should return a field object with empty units array', () => {
      var field = createField();

      expect(field.units).to.be.array();
      expect(field.units).to.be.ofSize(0);
    });

    it('should return a field object associated with given player', () => {
      var player = {};

      var field = createField(player);

      expect(field.player).to.equal(player);
    });

    it("should return a field object with the given player's commander");
  });
});
