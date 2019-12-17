import { theCombatSkill } from '../../skillTestCommon/skillTestBase.spec';
import { daze } from './../../skills';
import { default as describeSkill } from './onAttack.spec';

describeSkill('daze', () => {
  let theDazeSkill = theCombatSkill(daze);

  describe('effects', () => {
    theDazeSkill.givenTheDefender
      .shouldAffectTheStatus('attackWeaken').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();

    theDazeSkill.shouldNotAffectTheAttacker();
  });
});
