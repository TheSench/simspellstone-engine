import { theSkill } from './../skillTestCommon/activationSkillBase.spec';
import { frost } from './../skills';

describe('frostbreath', () => {
    let frostbreath = theSkill(frost);

    frostbreath.shouldTarget.opposingUnitsInACone();
    frostbreath.shouldOnlyAffect.targetsThatAreAlive();

    describe('effects', () => {
        frostbreath.shouldDealDamage
            .equalToItsValue()
            .modifiedBy('hexed', 'protection', 'warded');

        frostbreath.shouldOnlyAffectTheStatus('healthLeft');

        frostbreath.shouldBeNegatedBy.invisible();
    });
});
