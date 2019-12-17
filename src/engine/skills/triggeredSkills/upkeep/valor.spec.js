import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';
import { valor } from './../../skills';
import { default as describeSkill } from './upkeep.spec';

describeSkill('valor', () => {
  let theValorSkill = theTurnSkill(valor);

  describe('effects', () => {
    theValorSkill.shouldAffectTheUnit
      .shouldAffectTheStatus('attackValor').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();
  });
});
