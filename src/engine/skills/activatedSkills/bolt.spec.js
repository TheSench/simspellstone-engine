import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { strike } from './../skills';

describe('bolt', () => {
    let bolt = theSkill(strike);
    
    bolt.shouldOnlyAffect.targetsThatAreAlive();
    bolt.shouldTarget.allOpposingUnits();

    describe('effects', () => {
        bolt.shouldDealDamage.equalToItsValue(),
        bolt.shouldDealDamage.modifiedBy('hexed', 'protection', 'warded');
        bolt.shouldOnlyAffectTheStatus('healthLeft'),
        bolt.shouldBeNegatedBy.invisible();
    });
});
