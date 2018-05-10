import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { frost } from './../skills';

describe('frostbreath', () => {
  let frostbreath = theActivationSkill(frost);

  frostbreath.shouldTarget.opposingUnitsInACone()
    .onlyAffecting.targetsThatAreAlive()
    .unlessTheyAre.invisible();

  describe('effects', () => {
    frostbreath.whenAffectingTargets
      .shouldDealDamage.equalToItsValue().modifiedBy('protection', 'warded', 'hexed')
      .and.shouldAffectNoOtherStatuses();
  });
});
