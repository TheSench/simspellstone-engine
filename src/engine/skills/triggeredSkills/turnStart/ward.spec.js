import { whenTriggered } from '../testTurnSkill.spec';
import { absorb } from './../../skills';

describe('ward', () => {
  let ward = whenTriggered(absorb);

  describe('effects', () => {
    ward.shouldAffectItself
      .applyingTheStatus('warded').stackingWithCurrentValue()
      .and.affectNoOtherStatuses();
  });
});
