import { theSkill } from './../../skillTestCommon/skillCommon.spec';
import { counterburn } from './../../skills';

describe('emberhide', () => {
    let emberhide = theSkill(counterburn);

    describe('effects', () => {
        emberhide.shouldApplyTheStatus('scorched').stackingWithCurrentValue();
        emberhide.shouldApplyTheStatus('scorchTimer').replacingCurrentValueWith(2);
        emberhide.shouldNotAffectStatusesOtherThan('scorched', 'scorchTimer');
    });
});
