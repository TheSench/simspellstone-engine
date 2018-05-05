import { daze } from './../../skills';
import { whenTriggered } from '../testCombatSkill.spec';

describe('daze', () => {
  let theDazeSkill = whenTriggered(daze);

  describe('effects', () => {
    theDazeSkill.shouldAffectTheDefender
      .applyingTheStatus('attackWeaken').stackingWithCurrentValue()
      .and.affectNoOtherStatuses();

    theDazeSkill.shouldNotAffectTheAttacker();
  });
});
