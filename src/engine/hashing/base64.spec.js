import { expect } from 'chai';
import { base10ToBase64, base64ToBase10 } from './base64';

describe('base64 encoding', () => {
  [
    1,
    10,
    100,
    1000,
    1073741823
  ].forEach((base10) => {
    it('should return the starting value when encoding and then decoding (' + base10 + ')', () => {
      var converted = base64ToBase10(base10ToBase64(base10, 5));

      expect(converted).to.equal(base10);
    });
  });

  it('should handle characters from the legacy hashing algorithm', () => {
    var converted = base64ToBase10('!~');
    var legacy = base64ToBase10('+/');

    expect(legacy).to.equal(converted);
  });
});
