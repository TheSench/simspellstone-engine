import { theCombatSkill } from '../../skillTestCommon/triggeredSkillBase.spec';
import { venom } from './../../skills';

describe('venom', () => {
  let theVenomSkill = theCombatSkill(venom);

  theVenomSkill.givenTheDefender
    .shouldAffectTheStatus('envenomed').replacingTheCurrentValueIfHigher()
    .and.shouldAffectTheStatus('hexed').stackingWithCurrentValue()
    .and.shouldAffectNoOtherStatuses();

  it('adds envenomed to the attacker');

  theVenomSkill.shouldNotAffectTheAttacker();
});
