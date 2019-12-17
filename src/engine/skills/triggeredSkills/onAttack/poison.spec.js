import { theCombatSkill } from '../../skillTestCommon/skillTestBase.spec';
import { poison } from './../../skills';
import { default as describeSkill } from './onAttack.spec';

describeSkill('poison', () => {
  let thePoisonSkill = theCombatSkill(poison);

  describe('effects', () => {
    thePoisonSkill.givenTheDefender
      .shouldAffectTheStatus('poisoned').replacingTheCurrentValueIfHigher()
      .and.shouldAffectNoOtherStatuses();

    it('adds poisoned to the attacker');

    thePoisonSkill.shouldNotAffectTheAttacker();
  });
});
