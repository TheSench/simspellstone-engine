import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { evadebarrier } from './../skills';

describe('wingWard', () => {
  let wingWard = theActivationSkill(evadebarrier);

  wingWard.shouldTarget.allAlliedUnits()
    .onlyAffecting.targetsThatAreAlive()
    .unlessTheyAre.nullified();

  describe('effects', () => {
    wingWard.whenAffectingTargets
      .shouldAffectTheStatus('protection').stackingWithCurrentValue()
      .and.shouldAffectTheStatus('invisible').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();
  });
});
