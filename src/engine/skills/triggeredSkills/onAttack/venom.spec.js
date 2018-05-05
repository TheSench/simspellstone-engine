import { venom } from './../../skills';
import { whenTriggered } from '../testCombatSkill.spec';

describe('venom', () => {
  let theVenomSkill = whenTriggered(venom);

  theVenomSkill.shouldAffectTheDefender
    .applyingTheStatus('envenomed').keepingHighestValue()
    .and.applyingTheStatus('hexed').stackingWithCurrentValue()
    .and.affectNoOtherStatuses();

  theVenomSkill.shouldNotAffectTheAttacker();
});
