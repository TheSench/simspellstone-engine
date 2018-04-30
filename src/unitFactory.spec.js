import { expect } from 'chai';
import { createUnit } from './unitFactory';

describe('unitFactory', () => {
  describe('createUnit', () => {
    const unitInfo = { id: 1, level: 1, runeId: 1 };
    let unit = null;

    beforeEach(() => {
      unit = createUnit(unitInfo);
    });

    it('should return an object', () => {
      expect(unit).to.be.an('object');
    });

    describe('returned unit', () => {
      it('should have a status', () => {
        // TODO: Figure out why it complains that "object" is not an object (Object(unit) !== unit in assertion.js)
        //expect(unit).to.include('status');
        expect(unit.status).to.exist;
      });

      it('should have a unitInfo property matching the passed in info', () => {
        expect(unit.unitInfo).to.equal(unitInfo);
      });
    });
  });
});
