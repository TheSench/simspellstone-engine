import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { poisonstrike as poisonBolt } from './../skills';

describe('bolt', () => {
  let thePoisonBoltSkill = theSkill(poisonBolt);

  thePoisonBoltSkill.shouldTarget.allOpposingUnits();
  thePoisonBoltSkill.shouldOnlyAffect.targetsThatAreAlive();

  describe('effects', () => {
    thePoisonBoltSkill.shouldDealDamage
      .equalToItsValue()
      .modifiedBy('hexed', 'protection', 'warded');

    it('adds scorched to the target');

    thePoisonBoltSkill.shouldApplyTheStatus('poisoned').keepingHighestValue();
    thePoisonBoltSkill.shouldNotAffectStatusesOtherThan('poisoned', 'healthLeft');
    thePoisonBoltSkill.shouldBeNegatedBy.invisible();
  });
});
