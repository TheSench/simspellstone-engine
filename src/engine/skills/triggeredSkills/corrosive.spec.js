import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { corrosive } from './../skills';

describe('corrosive', () => {
    let theCorrosiveSkill = theSkill(corrosive);

    describe('effects', () => {
        theCorrosiveSkill.shouldApplyTheStatus('attackCorroded').stackingWithCurrentValue();
        theCorrosiveSkill.shouldApplyTheStatus('corroded').stackingWithCurrentValue();
        theCorrosiveSkill.shouldApplyTheStatus('corrodedTimer').replacingCurrentValueWith(2);
        theCorrosiveSkill.shouldNotAffectStatusesOtherThan('attackCorroded', 'corroded', 'corrodedTimer');
    });
});
