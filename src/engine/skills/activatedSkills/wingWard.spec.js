import { expect } from 'chai';
import { evadebarrier as wingWard } from './../skills';
import { createTestUnit } from './../../unitFactory/unitFactory';
import { testTargetting, testPotentialTargets, testStatusApplication, testNegation } from './../skillTestCommon/skillCommon.spec';

describe('wingWard', () => {
    testTargetting(wingWard);
    testPotentialTargets.allAllied(wingWard);

    describe('effects', () => {
        testStatusApplication(wingWard, 'protection', true, true);

        it(`should set scorchTimer to 2`, () => {
            let target = createTestUnit();

            wingWard.affectTarget(null, null, target, 5);

            expect(target.status.invisible, 'invisible').to.equal(5);
        });

        it(`should stack with existing invisible`, () => {
            let target = createTestUnit({ status: { invisible: 5 } });

            wingWard.affectTarget(null, null, target, 5);

            expect(target.status.invisible, 'invisible').to.equal(10);
        });

        it(`should ONLY modify protection and invisible`, () => {
            let target = createTestUnit();
            let expectedStatus = Object.assign({}, target.status, { protection: 5, invisible: 5 });

            wingWard.affectTarget(null, null, target, 5);

            expect(target.status, "target.status").to.deep.equal(expectedStatus);
        });

        testNegation(wingWard, 'nullified');
    });
});
