import { reverseMap } from './../helpers/mapHelpers';

export const ids = Object.freeze({
  Commander: 1,
  Assault: 2,
  Trap: 3,
});

export const names = Object.freeze(reverseMap(ids));
