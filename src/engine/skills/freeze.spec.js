import { expect } from 'chai';
import { jam as freeze } from './skills';
import states from './../unitFactory/unitStates';
import { createTestUnit } from './../unitFactory/unitFactory';
import { testTargetting, testStatusApplication, testNegation } from './skillCommon.spec';

describe('freeze', () => {
    testTargetting(freeze, ['active', 'activeNextTurn', 'weakened']);

    describe('effects', () => {
        testStatusApplication(freeze);

        it('should change state to frozen', () => {
            let target = createTestUnit();
            freeze.affectTarget(null, null, target, null);

            expect(target.state, "target.state").to.equal(states.frozen);
        });

        testNegation(freeze, 'invisible');
    });
});
