
import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';
import { valorTriggered } from './../../skills';
describe('valor', () => {
    describe('effects', () => {
        theTurnSkill(valorTriggered).shouldDoNothing();
    });
});
