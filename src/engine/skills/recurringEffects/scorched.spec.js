import { whenTriggered } from '../skillTestCommon/recurringEffectBase.spec';
import { scorched } from './../skills';

describe('scorched', () => {
  whenTriggered.atTurnEnd(scorched)
    .shouldDealDamage.equalToTheValueOf('scorched')
    .and.shouldModifyTheStatus('scorchTimer').decrementingTheCurrentValueBy(1)
    .and.affectNoOtherStatuses();

  whenTriggered.atTurnEnd(scorched)
    .shouldWearOff.whenTimer('scorchTimer').becomesZero();
});
