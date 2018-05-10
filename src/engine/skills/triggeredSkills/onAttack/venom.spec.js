import { theCombatSkill } from '../../skillTestsConsolidated/triggeredSkillBase.spec';
import { venom } from './../../skills';

describe('venom', () => {
  let theVenomSkill = theCombatSkill(venom);

  theVenomSkill.shouldAffectTheDefender
    .applyingTheStatus('envenomed').keepingHighestValue()
    .and.applyingTheStatus('hexed').stackingWithCurrentValue()
    .and.affectNoOtherStatuses();

  it('adds envenomed to the attacker');

  theVenomSkill.shouldNotAffectTheAttacker();
});
