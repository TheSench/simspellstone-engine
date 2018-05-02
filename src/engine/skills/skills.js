import Bolt from './bolt';
import Empower from './empower';
import Freeze from './freeze';
import Frostbreath from './frostbreath';
import Hex from './hex';
import Protect from './protect';
import Scorch from './scorch';
import Scorchbreath from './scorchbreath';
import Weaken from './weaken';

// maintain legacy skill names
export const burn = Object.freeze(new Scorch());
export const enfeeble = Object.freeze(new Hex());
export const frost = Object.freeze(new Frostbreath());
export const jam = Object.freeze(new Freeze());
export const protect = Object.freeze(new Protect());
export const rally = Object.freeze(new Empower());
export const scorchbreath = Object.freeze(new Scorchbreath());
export const strike = Object.freeze(new Bolt());
export const weaken = Object.freeze(new Weaken());