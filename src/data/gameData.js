// We must import and export these in separate statements or sinon gets the following error:
// TypeError: Cannot redefine property: ...

import { default as cardData } from './cards';
import { fusions as fusionData, reverseFusions as reverseFusionData } from './fusions';
//import { default as runes } from './runes';
import { default as skillData } from './skills';

export const cards = cardData;
export const fusions = fusionData;
export const reverseFusions = reverseFusionData;
export const runes = {};
export const skills = skillData;
