import { poison } from './../skills';
import { testStatusApplication } from './../skillTestCommon/skillCommon.spec';

describe('poison', () => {
    describe('effects', () => {
        testStatusApplication(poison, 'poisoned', false);
    });
});
