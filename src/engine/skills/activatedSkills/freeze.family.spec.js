import { theSkill } from './../skillTestCommon/activationSkillBase.spec';
import { jam as freeze, jamself as freezeSelf } from './../skills';

describe('freeze', () => {
    testFreezeBase(freeze);
    theSkill(freeze).shouldTarget.allOpposingUnits();
});

describe('freezeSelf', () => {
    testFreezeBase(freezeSelf);
    theSkill(freezeSelf).shouldTarget.itself();
});

function testFreezeBase(freezeSkill) {
    let freeze = theSkill(freezeSkill);

    freeze.shouldOnlyAffect.targetsThatWillBeActive();

    describe('effects', () => {
        freeze.shouldNotApplyAnyStatuses();
        freeze.shouldChangeStateOfTargetTo('frozen');
        freeze.shouldBeNegatedBy.invisible();
    });
}