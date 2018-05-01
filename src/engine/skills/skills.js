import Bolt from './bolt';
import Freeze from './freeze';
import Hex from './hex';
import Protect from './protect';
import Weaken from './weaken';
import Empower from './empower';

// maintain legacy skill names
export const enfeeble = Object.freeze(new Hex());
export const jam = Object.freeze(new Freeze());
export const protect = Object.freeze(new Protect());
export const rally = Object.freeze(new Empower());
export const strike = Object.freeze(new Bolt());
export const weaken = Object.freeze(new Weaken());