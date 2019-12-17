import { stasis } from '../../skills';
import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';
import { default as describeSkill } from './turnStart.spec';

describeSkill('stasis', () => {
  let shroud = theTurnSkill(stasis);

  describe('effects', () => {
    shroud.shouldAffectTheUnit
      .shouldAffectTheStatus('shrouded').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();
  });

  it('should really work like armor');
});
