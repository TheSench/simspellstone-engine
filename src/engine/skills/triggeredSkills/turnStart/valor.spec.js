import { theSkill } from './../../skillTestCommon/skillCommon.spec';
import { valor } from './../../skills';

describe('valor', () => {
    let theValorSkill = theSkill(valor);

    describe('effects', () => {
        theValorSkill.shouldApplyTheStatus('attackValor').replacingCurrentValue();
        theValorSkill.shouldApplyTheStatus('valorTriggered').replacingCurrentValueWith(true);
        theValorSkill.shouldNotAffectStatusesOtherThan('attackValor', 'valorTriggered');

        it('should only trigger once');
    });
});
