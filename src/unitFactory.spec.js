import { expect } from 'chai';
import { createUnit } from './unitFactory';

describe('unitFactory', () => {
  describe('createUnit', () => {
    let unit = null;

    beforeEach(() => {
      unit = createUnit({});
    });

    it('should return an object', () => {
      expect(unit).to.be.an('object');
    });

    describe('returned unit', () => {
      it('should have a status', () => {
        expect(unit).to.include('status');
      });
    });
  });
});
