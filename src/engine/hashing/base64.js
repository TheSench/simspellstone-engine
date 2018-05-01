const base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
const base64Vals = base64chars.split('').reduce(function (map, char, index) {
  map[char] = index;
  return map;
}, {});

export function base10ToBase64(base10, len) {
  let base64 = '';

  for (let i = len; i > 0; i--) {
    var part = base10 % 64;
    base64 += base64chars[part];
    base10 = (base10 - part) / 64;
  }

  return base64;
}

export function base64ToBase10(base64) {
  let base10 = 0;
  var converted = convertLegacyChars(base64);
  for (let i = converted.length - 1; i >= 0; i--) {
    base10 = base10 * 64 + base64Vals[converted[i]];
  }

  return base10;
}

function convertLegacyChars(base64) {
  return base64.replace('!', '+').replace('~', '/');
}
