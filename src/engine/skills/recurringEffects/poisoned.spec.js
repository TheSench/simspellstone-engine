import { theRecurringEffect } from '../skillTestCommon/skillTestBase.spec';
import { poisoned } from './../skills';
import { default as describeSkill } from './../skills.spec';

describeSkill('poisoned', () => {
  let thePoisonedEffect = theRecurringEffect(poisoned).triggeredAtTurnEnd();

  thePoisonedEffect
    .shouldDealDamage.equalToTheValueOf('poisoned')
    .and.shouldAffectNoOtherStatuses();

    thePoisonedEffect.shouldNeverWearOff();
});
