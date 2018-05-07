import { corrosive } from './../../skills';
import { whenTriggered } from '../testCombatSkill.spec';

describe('corrosive', () => {
  let theCorrosiveSkill = whenTriggered(corrosive);

  describe('effects', () => {
    theCorrosiveSkill.shouldAffectTheAttacker
      .applyingTheStatus('attackCorroded').stackingWithCurrentValue()
      .and.applyingTheStatus('corroded').stackingWithCurrentValue()
      .and.applyingTheStatus('corrodedTimer').replacingCurrentValueWith(2)
      .and.affectNoOtherStatuses();

    theCorrosiveSkill.shouldNotAffectTheDefender();
  });
});
