import { whenTriggered } from '../testCombatSkill.spec';
import { corrosive } from './../../skills';

describe('corrosive', () => {
  let theCorrosiveSkill = whenTriggered(corrosive);

  describe('effects', () => {
    theCorrosiveSkill.shouldAffectTheAttacker
      .applyingTheStatus('attackWeaken').stackingWithCurrentValue()
      .and.applyingTheStatus('corroded').stackingWithCurrentValue()
      .and.applyingTheStatus('corrodedTimer').replacingCurrentValueWith(2)
      .and.affectNoOtherStatuses();

    theCorrosiveSkill.shouldNotAffectTheDefender();

    it('adds corroded to the attacker');
  });
});
