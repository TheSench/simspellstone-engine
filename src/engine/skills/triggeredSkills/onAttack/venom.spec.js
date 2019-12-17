import { theCombatSkill } from '../../skillTestCommon/skillTestBase.spec';
import { venom } from './../../skills';
import { default as describeSkill } from './onAttack.spec';

describeSkill('venom', () => {
  let theVenomSkill = theCombatSkill(venom);

  theVenomSkill.givenTheDefender
    .shouldAffectTheStatus('envenomed').replacingTheCurrentValueIfHigher()
    .and.shouldAffectTheStatus('hexed').stackingWithCurrentValue()
    .and.shouldAffectNoOtherStatuses();

  it('adds envenomed to the attacker');

  theVenomSkill.shouldNotAffectTheAttacker();
});
