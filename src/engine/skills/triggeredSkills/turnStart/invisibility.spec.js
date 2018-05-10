import { theTurnSkill } from '../../skillTestsConsolidated/triggeredSkillBase.spec';
import { evade } from './../../skills';

describe('invisibility', () => {
  let invisibility = theTurnSkill(evade);

  describe('effects', () => {
    invisibility.shouldAffectItself
      .applyingTheStatus('invisible').stackingWithCurrentValue()
      .and.affectNoOtherStatuses();
  });
});
