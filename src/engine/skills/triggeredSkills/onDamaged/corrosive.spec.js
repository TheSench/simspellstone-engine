import { theCombatSkill } from '../../skillTestCommon/skillTestBase.spec';
import { corrosive } from './../../skills';

describe('corrosive', () => {
  let theCorrosiveSkill = theCombatSkill(corrosive);

  describe('effects', () => {
    theCorrosiveSkill.givenTheAttacker
      .shouldAffectTheStatus('attackWeaken').stackingWithCurrentValue()
      .and.shouldAffectTheStatus('corroded').stackingWithCurrentValue()
      .and.shouldAffectTheStatus('corrosionTimer').replacingCurrentValueWith(2)
      .and.shouldAffectNoOtherStatuses();

    theCorrosiveSkill.shouldNotAffectTheDefender();

    it('adds corroded to the attacker');
  });
});
