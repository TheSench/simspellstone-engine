
import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';
import { unitUpkeep } from './../../skills';
import { default as describeSkill } from './upkeep.spec';

describeSkill('unitUpkeep', () => {
  describe('effects', () => {
    theTurnSkill(unitUpkeep).shouldAffectTheUnit
      .shouldAffectTheStatus('hexed').replacingCurrentValueWith(0)
      .and.shouldAffectTheStatus('enraged').replacingCurrentValueWith(0)
      .and.shouldAffectTheStatus('protection').replacingCurrentValueWith(0)
      .and.shouldAffectNoOtherStatuses();

    it('should remove enhance');
    it('should remove imbue');
    it('should countdown skill timers');
  });
});
