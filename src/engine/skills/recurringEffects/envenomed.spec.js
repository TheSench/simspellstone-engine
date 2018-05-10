import { envenomedHex, envenomedPoison } from './../skills';
import { whenTriggered } from './recurringEffects.spec';

describe('envenom', () => {
  // Hex at start of turn
  whenTriggered.atTurnStart(envenomedHex)
    .shouldModifyTheStatus('hexed').addingTheValueOf('envenomed').toTheCurrentValue()
    .and.affectNoOtherStatuses();

  whenTriggered.atTurnEnd(envenomedHex)
    .shouldNeverWearOff();

  // Poison at end of turn
  whenTriggered.atTurnEnd(envenomedPoison)
    .shouldDealDamage.equalToTheValueOf('envenomed')
    .and.affectNoOtherStatuses();

  whenTriggered.atTurnEnd(envenomedPoison)
    .shouldNeverWearOff();
});
