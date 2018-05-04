import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { weaken, weakenself as weakenSelf } from './../skills';

describe('weaken', () => {
    testWeakenBase(weaken);
    theSkill(weaken).shouldTarget.allOpposingUnits();
});
describe('weakenSelf', () => {
    testWeakenBase(weakenSelf);
    theSkill(weakenSelf).shouldTarget.itself();
});

function testWeakenBase(weakenSkill) {
    let weaken = theSkill(weakenSkill);

    weaken.shouldOnlyAffect.targetsThatWillAttack();

    describe('effects', () => {
        weaken.shouldOnlyAffectTheStatus('attackWeaken').stackingWithCurrentValue();
        weaken.shouldBeNegatedBy.invisible();
    });
}