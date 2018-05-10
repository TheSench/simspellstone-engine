import { theTurnSkill } from '../../skillTestCommon/triggeredSkillBase.spec';
import { evade } from './../../skills';

describe('invisibility', () => {
  let invisibility = theTurnSkill(evade);

  describe('effects', () => {
    invisibility.shouldAffectTheUnit
      .shouldAffectTheStatus('invisible').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();
  });
});
