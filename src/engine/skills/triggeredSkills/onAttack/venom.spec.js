import { whenTriggered } from '../testCombatSkill.spec';
import { venom } from './../../skills';

describe('venom', () => {
  let theVenomSkill = whenTriggered(venom);

  theVenomSkill.shouldAffectTheDefender
    .applyingTheStatus('envenomed').keepingHighestValue()
    .and.applyingTheStatus('hexed').stackingWithCurrentValue()
    .and.affectNoOtherStatuses();

  it('adds envenomed to the attacker');

  theVenomSkill.shouldNotAffectTheAttacker();
});
