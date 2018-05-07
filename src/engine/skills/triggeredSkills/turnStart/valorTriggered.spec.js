import { theSkill } from './../../skillTestCommon/skillCommon.spec';
import { valorTriggered } from './../../skills';

describe('valor', () => {
    describe('effects', () => {
        theSkill(valorTriggered).shouldDoNothing();
    });
});
