export { default as attack } from './activatedSkills/attack';
export { default as barrage } from './activatedSkills/barrage';
export { default as protect } from './activatedSkills/barrier';
export { default as strike } from './activatedSkills/bolt';
export { default as rally } from './activatedSkills/empower';
export { default as enlarge } from './activatedSkills/enlarge';
export { default as enrage } from './activatedSkills/enrage';
export { default as jam } from './activatedSkills/freeze';
export { default as jamself } from './activatedSkills/freezeSelf';
export { default as frost } from './activatedSkills/frostbreath';
export { default as heal } from './activatedSkills/heal';
export { default as enfeeble } from './activatedSkills/hex';
export { default as legion } from './activatedSkills/legion';
export { default as mark } from './activatedSkills/mark';
export { default as poisonstrike } from './activatedSkills/poisonBolt';
export { default as burn } from './activatedSkills/scorch';
export { default as scorchbreath } from './activatedSkills/scorchbreath';
export { default as burnself } from './activatedSkills/scorchSelf';
export { default as weaken } from './activatedSkills/weaken';
export { default as weakenself } from './activatedSkills/weakenSelf';
export { default as evadebarrier } from './activatedSkills/wingWard';
import Corroded from './recurringEffects/corroded';
import { EnvenomedHex, EnvenomedPoison } from './recurringEffects/envenomed';
import Poisoned from './recurringEffects/poisoned';
import Scorched from './recurringEffects/scorched';
import Berserk from './triggeredSkills/onAttack/berserk';
import Daze from './triggeredSkills/onAttack/daze';
import Nullify from './triggeredSkills/onAttack/nullify';
import Poison from './triggeredSkills/onAttack/poison';
import Reinforce from './triggeredSkills/onAttack/reinforce';
import Siphon from './triggeredSkills/onAttack/siphon';
import Venom from './triggeredSkills/onAttack/venom';
import Corrosive from './triggeredSkills/onDamaged/corrosive';
import Emberhide from './triggeredSkills/onDamaged/emberhide';
import Fury from './triggeredSkills/onDamaged/fury';
import Vengeance from './triggeredSkills/onDamaged/vengeance';
import ClearMark from './triggeredSkills/onDeath/clearMark';
import CommanderDied from './triggeredSkills/onDeath/commanderDied';
import Regenerate from './triggeredSkills/turnEnd/regenerate';
import UnitEndTurn from './triggeredSkills/turnEnd/unitEndTurn';
import Invisibility from './triggeredSkills/turnStart/invisibility';
import Ward from './triggeredSkills/turnStart/ward';
import UnitUpkeep from './triggeredSkills/upkeep/unitUpkeep';
import Valor from './triggeredSkills/upkeep/valor';
import ValorTriggered from './triggeredSkills/upkeep/valorTriggered';

// maintain legacy skill names
export const absorb = getInstance(Ward);
export const berserk = getInstance(Berserk);
export const clearMark = getInstance(ClearMark);
export const commanderDied = getInstance(CommanderDied);
export const corrosive = getInstance(Corrosive);
export const corroded = getInstance(Corroded);
export const counter = getInstance(Vengeance);
export const counterburn = getInstance(Emberhide);
export const daze = getInstance(Daze);
export const envenomedHex = getInstance(EnvenomedHex);
export const envenomedPoison = getInstance(EnvenomedPoison);
export const evade = getInstance(Invisibility);
export const fury = getInstance(Fury);
export const leech = getInstance(Siphon);
export const nullify = getInstance(Nullify);
export const poison = getInstance(Poison);
export const poisoned = getInstance(Poisoned);
export const regenerate = getInstance(Regenerate);
export const reinforce = getInstance(Reinforce);
export const scorched = getInstance(Scorched);
export const unitEndTurn = getInstance(UnitEndTurn);
export const unitUpkeep = getInstance(UnitUpkeep);
export const valor = getInstance(Valor);
export const valorTriggered = getInstance(ValorTriggered);
export const venom = getInstance(Venom);

function getInstance(Constructor) {
  return new Constructor();
}
