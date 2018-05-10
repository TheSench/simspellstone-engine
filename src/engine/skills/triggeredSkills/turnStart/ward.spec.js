import { theTurnSkill } from '../../skillTestsConsolidated/triggeredSkillBase.spec';
import { absorb } from './../../skills';

describe('ward', () => {
  let ward = theTurnSkill(absorb);

  describe('effects', () => {
    ward.shouldAffectItself
      .applyingTheStatus('warded').stackingWithCurrentValue()
      .and.affectNoOtherStatuses();
  });
});
