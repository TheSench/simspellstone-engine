import { theCombatSkill } from '../../skillTestCommon/triggeredSkillBase.spec';
import { daze } from './../../skills';

describe('daze', () => {
  let theDazeSkill = theCombatSkill(daze);

  describe('effects', () => {
    theDazeSkill.givenTheDefender
      .shouldAffectTheStatus('attackWeaken').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();

    theDazeSkill.shouldNotAffectTheAttacker();
  });
});
