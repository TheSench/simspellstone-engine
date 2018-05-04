import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { burn as scorch, burnself as scorchSelf, scorchbreath } from './../skills';


describe('scorch', () => {
    testScorchBase(scorch);
    theSkill(scorch).shouldTarget.theDirectlyOpposingUnit();
});

describe('scorchbreath', () => {
    testScorchBase(scorchbreath);
    theSkill(scorchbreath).shouldTarget.opposingUnitsInACone();
});

describe('scorchSelf', () => {
    testScorchBase(scorchSelf);
    theSkill(scorchSelf).shouldTarget.itself();
});


function testScorchBase(scorchSkill) {
    let scorch = theSkill(scorchSkill);

    scorch.shouldOnlyAffect.targetsThatAreAlive();
    scorch.shouldApplyTheStatus('scorched').stackingWithCurrentValue();
    scorch.shouldApplyTheStatus('scorchTimer').replacingCurrentValueWith(2);
    scorch.shouldNotAffectStatusesOtherThan('scorched', 'scorchTimer');
}