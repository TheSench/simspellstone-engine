import { counter as vengeance } from './../skills';
import { testDamage } from './../skillTestCommon/skillCommon.spec';

describe('vengeance', () => {
    describe('effects', () => {
        testDamage(vengeance, {
            hexed: false
        });
    });
});
