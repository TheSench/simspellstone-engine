import { theCombatSkill } from '../../skillTestsConsolidated/triggeredSkillBase.spec';
import { daze } from './../../skills';

describe('daze', () => {
  let theDazeSkill = theCombatSkill(daze);

  describe('effects', () => {
    theDazeSkill.shouldAffectTheDefender
      .applyingTheStatus('attackWeaken').stackingWithCurrentValue()
      .and.affectNoOtherStatuses();

    theDazeSkill.shouldNotAffectTheAttacker();
  });
});
