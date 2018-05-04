import { evade as invisibility } from './../../skills';
import { testStatusApplication } from './../../skillTestCommon/skillCommon.spec';

describe('invisibility', () => {
    describe('effects', () => {
        testStatusApplication(invisibility, 'invisible', true);
    });
});
