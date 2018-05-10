import { whenTriggered } from '../skillTestCommon/recurringEffectBase.spec';
import { poisoned } from './../skills';

describe('poisoned', () => {
  whenTriggered.atTurnEnd(poisoned)
    .shouldDealDamage.equalToTheValueOf('poisoned')
    .and.affectNoOtherStatuses();

  whenTriggered.atTurnEnd(poisoned)
    .shouldNeverWearOff();
});
