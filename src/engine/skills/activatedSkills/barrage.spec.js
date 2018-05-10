import { theSkill } from './../skillTestCommon/activationSkillBase.spec';
import { barrage } from './../skills';

describe('barrage', () => {
    let theBarrageSkill = theSkill(barrage);

    theBarrageSkill.shouldOnlyAffect.targetsThatAreAlive();
    theBarrageSkill.shouldTarget.allOpposingUnits();

    describe('effects', () => {
        theBarrageSkill.shouldDealDamage
            .equalToItsValue()
            .modifiedBy('protection', 'warded');

        theBarrageSkill.shouldOnlyAffectTheStatus('healthLeft');
        
        theBarrageSkill.shouldBeNegatedBy.invisible();
    });

    it('should fire X times where X is its value');
});
