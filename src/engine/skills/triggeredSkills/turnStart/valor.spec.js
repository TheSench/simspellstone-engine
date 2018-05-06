import { whenTriggered } from '../testTurnSkill.spec';
import { valor } from './../../skills';

describe('valor', () => {
  let theValorSkill = whenTriggered(valor);

  describe('effects', () => {
    theValorSkill.shouldAffectItself
      .applyingTheStatus('attackValor').replacingCurrentValue()
      .and.applyingTheStatus('valorTriggered').replacingCurrentValueWith(true)
      .and.affectNoOtherStatuses();

    it('should only trigger once');
  });
});
