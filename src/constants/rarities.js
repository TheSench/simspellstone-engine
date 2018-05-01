import { reverseMap } from './../helpers/mapHelpers';

export const ids = Object.freeze({
  Common: 0,
  Uncommon: 1,
  Rare: 2,
  Epic: 3,
  Legendary: 4,
  Mythic: 5
});

export const names = Object.freeze(reverseMap(ids));
