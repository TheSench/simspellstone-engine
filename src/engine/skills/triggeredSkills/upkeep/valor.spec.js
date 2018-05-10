import { theTurnSkill } from '../../skillTestCommon/triggeredSkillBase.spec';
import { valor } from './../../skills';

describe('valor', () => {
  let theValorSkill = theTurnSkill(valor);

  describe('effects', () => {
    theValorSkill.shouldAffectTheUnit
      .applyingTheStatus('attackValor').replacingCurrentValue()
      .and.affectNoOtherStatuses();

    it('should mark itself as triggered once it fires', () => {
      theValorSkill.shouldChangeItselfTo('valorTriggered');
    });
  });
});
