import { theSkill } from './../skillTestCommon/activationSkillBase.spec';
import { attack as skill } from './../skills';

describe('attack', () => {
    let attack = theSkill(skill);

    attack.shouldTarget.theDirectlyOpposingUnitOrCommander();
    attack.shouldOnlyAffect.targetsThatAreAlive();

    describe('effects', () => {
        attack.shouldDealDamage
            .equalToItsValue()
            .modifiedBy('hexed', 'protection', 'armored');

        attack.shouldOnlyAffectTheStatus('healthLeft');
        
        attack.shouldBeNegatedBy.nothing();
    });
});
