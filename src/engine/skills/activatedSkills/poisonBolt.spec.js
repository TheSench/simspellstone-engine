import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { poisonstrike as poisonBolt } from './../skills';

describe('poisonBolt', () => {
  let thePoisonBoltSkill = theActivationSkill(poisonBolt);

  thePoisonBoltSkill.shouldTarget.allOpposingUnits()
    .onlyAffecting.targetsThatAreAlive()
    .unlessTheyAre.invisible();

  describe('effects', () => {
    thePoisonBoltSkill.whenAffectingTargets
      .shouldDealDamage.equalToItsValue().modifiedBy('hexed', 'protection', 'warded', 'stasisField')
      .and.shouldAffectTheStatus('poisoned').replacingTheCurrentValueIfHigher()
      .and.shouldAffectNoOtherStatuses();

      it('adds poisoned to the attacker');
  });
});
