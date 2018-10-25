import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';
import { valor } from './../../skills';

describe('valor', () => {
  let theValorSkill = theTurnSkill(valor);

  describe('effects', () => {
    theValorSkill.shouldAffectTheUnit
      .shouldAffectTheStatus('attackValor').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();
  });
});
