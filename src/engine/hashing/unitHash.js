import { base10ToBase64, base64ToBase10 } from './base64';
import { fusions } from './../../data/gameData';

const fusionSpace = 3;
const levelSpace = 7;
const runeIdSpace = 1000;

export function unitKeyToBase64(unitKey) {
  let baseId = unitKey.id;
  let fusion = 0;
  let level = unitKey.level - 1;

  fusion = Math.floor(baseId / 10000);
  if(fusion > 0) {
    baseId %= 10000;
  } else {
    fusion = Math.floor(level / levelSpace);
    level %= levelSpace;
  }

  // Runes IDs are all in the range of 5001 - 5500
  let runeId = unitKey.runeId % 5000;

  let dec = baseId;
  dec = dec * fusionSpace + fusion;
  dec = dec * levelSpace + level;
  dec = dec * runeIdSpace + runeId;

  return base10ToBase64(dec, 5);
}

export function base64ToUnitKey(base64) {
  let dec = base64ToBase10(base64);

  let runeId = dec % runeIdSpace;
  dec = (dec - runeId) / runeIdSpace;
  if(runeId) runeId += 5000;

  let level = dec % levelSpace;

  dec = (dec - level++) / levelSpace;

  let fusion = dec % fusionSpace;
  dec = (dec - fusion) / fusionSpace;

  let baseId = dec;

  if (fusions[baseId]) {
    baseId += fusion * 10000;
  } else if (fusion > 0) {
    level += fusion * 7;
  }

  return {
    id: baseId,
    level: level,
    runeId: runeId
  };
}
