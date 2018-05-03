import { expect } from 'chai';
import { jam as freeze, jamself as freezeSelf } from './../skills';
import states from './../../unitFactory/unitStates';
import { createTestUnit } from './../../unitFactory/unitFactory';
import { testTargetting, testPotentialTargets, testStatusApplication, testNegation } from './../skillTestCommon/skillCommon.spec';

describe('freeze', () => {
    testFreezeBase(freeze);
    testPotentialTargets.allOpposing(freeze);
});

describe('freezeSelf', () => {
    testFreezeBase(freezeSelf);
    testPotentialTargets.self(freezeSelf);
});

function testFreezeBase(freezeSkill) {
    testTargetting(freezeSkill, ['active', 'activeNextTurn', 'weakened']);

    describe('effects', () => {
        testStatusApplication(freezeSkill);

        it('should change state to frozen', () => {
            let target = createTestUnit();
            freezeSkill.affectTarget(null, null, target, null);

            expect(target.state, "target.state").to.equal(states.frozen);
        });

        testNegation(freezeSkill, 'invisible');
    });
}