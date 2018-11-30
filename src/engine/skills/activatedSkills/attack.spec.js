import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { attack as skill } from './../skills';

describe('attack', () => {
  let attack = theActivationSkill(skill);

  attack.shouldTarget.theDirectlyOpposingUnitOrCommander()
    .onlyAffecting.targetsThatAreAlive()
    .andNeverBeNegated();

  describe('effects', () => {
    attack.whenAffectingTargets
      .shouldDealDamage.equalToItsValue().modifiedBy('hexed', 'protection', 'armored', 'shrouded')
      .and.shouldAffectNoOtherStatuses();
  });
});
