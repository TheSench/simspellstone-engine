import { theRecurringEffect } from '../skillTestCommon/skillTestBase.spec';
import { envenomedHex, envenomedPoison } from './../skills';
import { default as describeSkill } from './../skills.spec';

describeSkill('envenom', () => {
  let envenomedHexEffect = theRecurringEffect(envenomedHex).triggeredAtTurnStart();
  let envenomedPoisonEffect = theRecurringEffect(envenomedPoison).triggeredAtTurnStart();

  // Hex at start of turn
  envenomedHexEffect
    .shouldAffectTheStatus('hexed').addingTheValueOf('envenomed').toTheCurrentValue()
    .and.shouldAffectNoOtherStatuses();

  envenomedHexEffect.shouldNeverWearOff();

  // Poison at end of turn
  envenomedPoisonEffect
    .shouldDealDamage.equalToTheValueOf('envenomed')
    .and.shouldAffectNoOtherStatuses();

  envenomedPoisonEffect.shouldNeverWearOff();
});
