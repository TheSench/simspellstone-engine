import { whenTriggered } from '../testTurnSkill.spec';
import { valorTriggered } from './../../skills';

describe('valor', () => {
    describe('effects', () => {
        whenTriggered(valorTriggered).shouldDoNothing();
    });
});
