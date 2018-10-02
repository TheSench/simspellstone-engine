import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';
import { stasis } from './../../skills';

describe('stasis', () => {
  let theStasisSkill = theTurnSkill(stasis);

  describe('effects', () => {
    theStasisSkill.shouldAffectTheUnit
      .shouldAffectTheStatus('stasisField').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();
  });
});
