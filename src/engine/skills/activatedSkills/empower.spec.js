import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { rally as empower } from './../skills';

describe('empower', () => {
    let theEmpowerSkill = theSkill(empower);
    
    theEmpowerSkill.shouldTarget.allAlliedUnits();
    theEmpowerSkill.shouldOnlyAffect.targetsThatAreActive();

    describe('effects', () => {
        theEmpowerSkill.shouldOnlyAffectTheStatus('attackEmpower').stackingWithCurrentValue();
        theEmpowerSkill.shouldBeNegatedBy.nullified();
    });
});
