import { theSkill } from './../../skillTestCommon/skillCommon.spec';
import { poison } from './../../skills';
import { whenTriggered } from '../testCombatSkill.spec';

describe('poison', () => {
  let thePoisonSkill = whenTriggered(poison);

  describe('effects', () => {
    thePoisonSkill.shouldAffectTheDefender
      .applyingTheStatus('poisoned').keepingHighestValue()
      .and.affectNoOtherStatuses();

    thePoisonSkill.shouldNotAffectTheAttacker();
  });
});
