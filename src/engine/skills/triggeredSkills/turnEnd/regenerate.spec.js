import { regenerate } from './../../skills';
import { whenTriggered } from '../testTurnSkill.spec';

describe('regenerate', () => {
    let theRegenerateSkill = whenTriggered(regenerate);

    describe('effects', () => {
        theRegenerateSkill.shouldAffectItself
          .healingDamage.equalToItsValue()
          .and.affectNoOtherStatuses();
    });
});
