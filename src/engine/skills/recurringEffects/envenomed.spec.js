import { poisoned } from './../skills';
import { whenTriggered } from './recurringEffects.spec';

describe('poisoned', () => {
  whenTriggered.atTurnEnd(poisoned)
    .shouldDealDamage.equalToTheValueOf('poisoned')
    .and.affectNoOtherStatuses();

  whenTriggered.atTurnEnd(poisoned)
    .shouldNeverWearOff();
});
