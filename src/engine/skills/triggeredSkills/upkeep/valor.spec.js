import { theTurnSkill } from '../../skillTestsConsolidated/triggeredSkillBase.spec';
import { valor } from './../../skills';

describe('valor', () => {
  let theValorSkill = theTurnSkill(valor);

  describe('effects', () => {
    theValorSkill.shouldAffectItself
      .applyingTheStatus('attackValor').replacingCurrentValue()
      .and.affectNoOtherStatuses();

    it('should mark itself as triggered once it fires', () => {
      theValorSkill.shouldChangeItselfTo('valorTriggered');
    });
  });
});
