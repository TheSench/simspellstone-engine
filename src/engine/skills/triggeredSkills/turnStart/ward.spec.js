import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';
import { absorb } from './../../skills';
import { default as describeSkill } from './turnStart.spec';

describeSkill('ward', () => {
  let ward = theTurnSkill(absorb);

  describe('effects', () => {
    ward.shouldAffectTheUnit
      .shouldAffectTheStatus('warded').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();
  });
});
