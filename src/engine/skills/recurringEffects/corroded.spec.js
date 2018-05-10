import { theRecurringEffect } from '../skillTestCommon/triggeredSkillBase.spec';
import { corroded } from './../skills';

describe('corroded', () => {
  let corrodedEffect = theRecurringEffect(corroded).triggeredAtTurnEnd();

  corrodedEffect
    .shouldAffectTheStatus('attackWeaken').addingTheValueOf('corroded').toTheCurrentValue()
    .and.shouldAffectTheStatus('corrosionTimer').decrementingTheCurrentValueBy(1)
    .and.shouldAffectNoOtherStatuses();

  corrodedEffect
    .shouldWearOff.whenTimer('corrosionTimer').becomesZero()
    .and.shouldClearTheStatus('corroded');
});
