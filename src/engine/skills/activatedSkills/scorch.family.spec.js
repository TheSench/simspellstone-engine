import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { burn as scorch, burnself as scorchSelf, scorchbreath } from './../skills';
import { default as describeSkill } from './../skills.spec';

describeSkill('scorch', () => {
  testScorchBase(scorch, 'theDirectlyOpposingUnit');
});

describeSkill('scorchbreath', () => {
  testScorchBase(scorchbreath, 'opposingUnitsInACone');
});

describeSkill('scorchSelf', () => {
  testScorchBase(scorchSelf, 'itself');
});

function testScorchBase(scorchSkill, targetShape) {
  let scorch = theActivationSkill(scorchSkill);

  scorch.shouldTarget[targetShape]()
    .onlyAffecting.targetsThatAreAlive()
    .andNeverBeNegated();

  describe('effects', () => {
    scorch.whenAffectingTargets
      .shouldAffectTheStatus('scorched').stackingWithCurrentValue()
      .and.shouldAffectTheStatus('scorchTimer').replacingCurrentValueWith(2)
      .and.shouldAffectNoOtherStatuses();

    it('adds scorched to the attacker');
  });
}
