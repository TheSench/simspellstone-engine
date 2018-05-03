import { reverseMap } from './../helpers/mapHelpers';

// We must import and export these in separate statements or sinon gets the following error:
// TypeError: Cannot redefine property: ...
import cardData from './cards';
import fusionData from './fusions';
//import { default as runes } from './runes';
import skillData from './skills';

export const cards = cardData;
export const fusions = fusionData;
export const reverseFusions = reverseMap(fusionData);
export const runes = {};
export const skills = skillData;
