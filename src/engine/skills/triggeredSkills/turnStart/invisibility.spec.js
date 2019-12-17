import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';
import { evade } from './../../skills';
import { default as describeSkill } from './turnStart.spec';

describeSkill('invisibility', () => {
  let invisibility = theTurnSkill(evade);

  describe('effects', () => {
    invisibility.shouldAffectTheUnit
      .shouldAffectTheStatus('invisible').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();
  });
});
