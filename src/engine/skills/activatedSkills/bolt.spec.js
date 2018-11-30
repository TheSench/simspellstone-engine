import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { strike } from './../skills';

describe('bolt', () => {
  let bolt = theActivationSkill(strike);

  bolt.shouldTarget.allOpposingUnits()
    .onlyAffecting.targetsThatAreAlive()
    .unlessTheyAre.invisible();

  describe('effects', () => {
    bolt.whenAffectingTargets
      .shouldDealDamage.equalToItsValue().modifiedBy('hexed', 'protection', 'warded', 'shrouded')
      .and.shouldAffectNoOtherStatuses();
  });
});
