import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { jam as freeze, jamself as freezeSelf } from './../skills';

describe('freeze', () => {
  testFreezeBase(freeze, 'allOpposingUnits');
});

describe('freezeSelf', () => {
  testFreezeBase(freezeSelf, 'itself');
});

function testFreezeBase(freezeSkill, targetShape) {
  let freeze = theActivationSkill(freezeSkill);

  freeze.shouldTarget[targetShape]()
    .onlyAffecting.targetsThatWillBeActive()
    .unlessTheyAre.invisible();

  describe('effects', () => {
    freeze.whenAffectingTargets
      .shouldNotAffectAnyStatuses();

    freeze.shouldChangeStateOfTargetTo('frozen');
  });
}