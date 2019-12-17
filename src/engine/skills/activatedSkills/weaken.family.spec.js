import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { weaken, weakenself as weakenSelf } from './../skills';
import { default as describeSkill } from './activatedSkills.spec';

describeSkill('weaken', () => {
  testWeakenBase(weaken, 'allOpposingUnits');
});

describeSkill('weakenSelf', () => {
  testWeakenBase(weakenSelf, 'itself');
});

function testWeakenBase(weakenSkill, targetShape) {
  let weaken = theActivationSkill(weakenSkill);

  weaken.shouldTarget[targetShape]()
    .onlyAffecting.targetsThatWillAttack()
    .unlessTheyAre.invisible();

  describe('effects', () => {
    weaken.whenAffectingTargets
      .shouldOnlyAffectTheStatus('attackWeaken').stackingWithCurrentValue();
  });
}
