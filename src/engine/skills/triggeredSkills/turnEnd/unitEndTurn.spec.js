
import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';
import { unitEndTurn } from './../../skills';
import { default as describeSkill } from './turnEnd.spec';

describeSkill('unitUpkeep', () => {
  describe('effects', () => {
    theTurnSkill(unitEndTurn).shouldAffectTheUnit
      .shouldAffectTheStatus('attackEmpower').replacingCurrentValueWith(0)
      .and.shouldAffectTheStatus('attackWeaken').replacingCurrentValueWith(0)
      .and.shouldAffectTheStatus('nullified').replacingCurrentValueWith(0)
      .and.shouldAffectTheStatus('silenced').replacingCurrentValueWith(false)
      .and.shouldAffectNoOtherStatuses();

    it('should remove enhance');
    it('should remove imbue');
    it('should unfreeze');
  });
});
