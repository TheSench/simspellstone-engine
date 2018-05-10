
import { theTurnSkill } from '../../skillTestsConsolidated/triggeredSkillBase.spec';
import { valorTriggered } from './../../skills';

describe('valor', () => {
    describe('effects', () => {
        theTurnSkill(valorTriggered).shouldDoNothing();
    });
});
