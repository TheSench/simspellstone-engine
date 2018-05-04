import { nullify } from './../../skills';
import { testStatusApplication } from './../../skillTestCommon/skillCommon.spec';

describe('nullify', () => {
    describe('effects', () => {
        testStatusApplication(nullify, 'nullified', true);
    });
});
