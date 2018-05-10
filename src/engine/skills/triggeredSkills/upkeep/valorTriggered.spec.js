
import { theTurnSkill } from '../../skillTestCommon/triggeredSkillBase.spec';
import { valorTriggered } from './../../skills';
describe('valor', () => {
    describe('effects', () => {
        theTurnSkill(valorTriggered).shouldDoNothing();
    });
});
