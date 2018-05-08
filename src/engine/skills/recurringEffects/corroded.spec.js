import { corroded } from './../skills';
import { whenTriggered } from './recurringEffects.spec';

describe('corroded', () => {
  whenTriggered.atTurnEnd(corroded)
    .shouldModifyTheStatus('attackWeaken').addingTheValueOf('corroded').toTheCurrentValue()
    .and.shouldModifyTheStatus('corrosionTimer').decrementingTheCurrentValueBy(1)
    .and.affectNoOtherStatuses();

  whenTriggered.atTurnEnd(corroded)
    .shouldWearOff.whenTimer('corrosionTimer').becomesZero()
    .and.clearTheStatus('corroded');
});
