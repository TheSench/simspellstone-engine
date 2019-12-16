import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { barrage } from './../skills';
import { default as describeSkill } from './../skills.spec';

describeSkill('barrage', () => {
  let theBarrageSkill = theActivationSkill(barrage);

  theBarrageSkill.shouldTarget.allOpposingUnits()
    .onlyAffecting.targetsThatAreAlive()
    .unlessTheyAre.invisible();

  describe('effects', () => {
    theBarrageSkill.whenAffectingTargets
      .shouldDealDamage.equalToItsValue().modifiedBy('protection', 'warded', 'shrouded')
      .and.shouldAffectNoOtherStatuses();
  });

  it('should fire X times where X is its value');
});
