import { nullify } from './../../skills';
import { whenTriggered } from '../testCombatSkill.spec';

describe('nullify', () => {
  let theNullifySkill = whenTriggered(nullify);

  describe('effects', () => {
    theNullifySkill.shouldAffectTheDefender
      .applyingTheStatus('nullified').stackingWithCurrentValue()
      .and.affectNoOtherStatuses();

    theNullifySkill.shouldNotAffectTheAttacker();
  });
});
