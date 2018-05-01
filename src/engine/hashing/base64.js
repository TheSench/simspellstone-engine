const base64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!~";
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

  for (let i = base64.length - 1; i >= 0; i--) {
    base10 = base10 * 64 + base64Vals[base64[i]];
  }

  return base10;
}
