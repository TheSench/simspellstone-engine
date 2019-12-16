import { theRecurringEffect } from '../skillTestCommon/skillTestBase.spec';
import { scorched } from './../skills';
import { default as describeSkill } from './../skills.spec';

describeSkill('scorched', () => {
  let theScorchedEffect = theRecurringEffect(scorched).triggeredAtTurnEnd();

  theScorchedEffect
    .shouldDealDamage.equalToTheValueOf('scorched')
    .and.shouldAffectTheStatus('scorchTimer').decrementingTheCurrentValueBy(1)
    .and.shouldAffectNoOtherStatuses();

  theScorchedEffect
    .shouldWearOff.whenTimer('scorchTimer').becomesZero();
});
