import { expect } from 'chai';
import { base10ToBase64, base64ToBase10 } from './base64';

describe('base64 encoding', () => {
  const tests = [
    1,
    10,
    100,
    1000,
    1073741823
  ];

  tests.forEach((base10) => {
    it('should return the starting value when encoding and then decoding', () => {
      var converted = base64ToBase10(base10ToBase64(base10, 5));

      expect(converted).to.equal(base10);
    });
  });
});
