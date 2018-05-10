import { theRecurringEffect } from '../skillTestCommon/skillTestBase.spec';
import { poisoned } from './../skills';

describe('poisoned', () => {
  let thePoisonedEffect = theRecurringEffect(poisoned).triggeredAtTurnEnd();

  thePoisonedEffect
    .shouldDealDamage.equalToTheValueOf('poisoned')
    .and.shouldAffectNoOtherStatuses();

    thePoisonedEffect.shouldNeverWearOff();
});
