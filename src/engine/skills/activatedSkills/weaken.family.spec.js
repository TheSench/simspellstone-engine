import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { weaken, weakenself as weakenSelf } from './../skills';

describe('weaken', () => {
  testWeakenBase(weaken, 'allOpposingUnits');
});
describe('weakenSelf', () => {
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