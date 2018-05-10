import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';
import { valor } from './../../skills';

describe('valor', () => {
  let theValorSkill = theTurnSkill(valor);

  describe('effects', () => {
    theValorSkill.shouldAffectTheUnit
      .shouldAffectTheStatus('attackValor').replacingCurrentValue()
      .and.shouldAffectNoOtherStatuses();

    it('should mark itself as triggered once it fires', () => {
      theValorSkill.shouldChangeItselfTo('valorTriggered');
    });
  });
});
