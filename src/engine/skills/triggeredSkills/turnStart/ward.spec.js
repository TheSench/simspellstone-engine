import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';
import { absorb } from './../../skills';

describe('ward', () => {
  let ward = theTurnSkill(absorb);

  describe('effects', () => {
    ward.shouldAffectTheUnit
      .shouldAffectTheStatus('warded').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();
  });
});
