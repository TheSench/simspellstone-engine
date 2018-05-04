import { theSkill } from './../../skillTestCommon/skillCommon.spec';
import { venom } from './../../skills';

describe('venom', () => {
    let theVenomSkill = theSkill(venom);
    describe('effects', () => {
        theVenomSkill.shouldApplyTheStatus('envenomed').keepingHighestValue();
        theVenomSkill.shouldApplyTheStatus('hexed').stackingWithCurrentValue();
        theVenomSkill.shouldNotAffectStatusesOtherThan('envenomed', 'hexed');
    });
});
