import { stasis } from '../../skills';
import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';

describe('stasis', () => {
  let shroud = theTurnSkill(stasis);

  describe('effects', () => {
    shroud.shouldAffectTheUnit
      .shouldAffectTheStatus('shrouded').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();
  });

  it('should really work like armor');
});
