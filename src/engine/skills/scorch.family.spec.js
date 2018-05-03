import { expect } from 'chai';
import { createTestUnit } from './../unitFactory/unitFactory';
import { testTargetting, testPotentialTargets, testStatusApplication, testNegation } from './skillTestCommon/skillCommon.spec';

import { burn as scorch, burnself as scorchSelf, scorchbreath } from './skills';

describe('scorch', () => {
    testScorchBase(scorch);
    testPotentialTargets.directlyOpposing(scorch);
});

describe('scorchbreath', () => {
    testScorchBase(scorchbreath);
    testPotentialTargets.cone(scorchbreath);
});

describe('scorchSelf', () => {
    testScorchBase(scorchSelf);
    testPotentialTargets.self(scorchSelf);
});


function testScorchBase(scorchSkill) {
    testTargetting(scorchSkill);

    describe('effects', () => {
        testStatusApplication(scorchSkill, 'scorched', true, true);

        it(`should set scorchTimer to 2`, () => {
            let target = createTestUnit();

            scorchSkill.affectTarget(null, null, target, 5);

            expect(target.status.scorchTimer, 'scorchTimer').to.equal(2);
        });

        it(`should always reset scorchTimer to 2`, () => {
            let target = createTestUnit({ status: { scorchTimer: 5 } });

            scorchSkill.affectTarget(null, null, target, 5);

            expect(target.status.scorchTimer, 'scorchTimer').to.equal(2);
        });

        it(`should ONLY modify scorch and scorchTimer and invisible`, () => {
            let target = createTestUnit();
            let expectedStatus = Object.assign({}, target.status, { scorched: 5, scorchTimer: 2 });

            scorchSkill.affectTarget(null, null, target, 5);

            expect(target.status, "target.status").to.deep.equal(expectedStatus);
        });

        testNegation(scorchSkill, null);
    });
}