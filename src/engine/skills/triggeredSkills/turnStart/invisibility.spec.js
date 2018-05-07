import { whenTriggered } from '../testTurnSkill.spec';
import { evade } from './../../skills';

describe('invisibility', () => {
  let invisibility = whenTriggered(evade);

  describe('effects', () => {
    invisibility.shouldAffectItself
      .applyingTheStatus('invisible').stackingWithCurrentValue()
      .and.affectNoOtherStatuses();
  });
});
