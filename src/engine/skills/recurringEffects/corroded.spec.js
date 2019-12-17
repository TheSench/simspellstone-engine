import { theRecurringEffect } from '../skillTestCommon/skillTestBase.spec';
import { corroded } from './../skills';
import { default as describeSkill } from './recurringEffects.spec';

describeSkill('corroded', () => {
  let corrodedEffect = theRecurringEffect(corroded).triggeredAtTurnEnd();

  corrodedEffect
    .shouldAffectTheStatus('attackWeaken').addingTheValueOf('corroded').toTheCurrentValue()
    .and.shouldAffectTheStatus('corrosionTimer').decrementingTheCurrentValueBy(1)
    .and.shouldAffectNoOtherStatuses();

  corrodedEffect
    .shouldWearOff.whenTimer('corrosionTimer').becomesZero()
    .and.shouldClearTheStatus('corroded');
});
