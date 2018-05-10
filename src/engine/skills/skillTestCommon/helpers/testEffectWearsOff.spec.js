import { expect } from 'chai';
import { createTestUnit } from "../../../unitFactory/unitFactory";

export function shouldWearOffWhenTimer({ executeSkill, effectType }, timer) {
    describe('effect wears off', () => {
        let unit,
            effectInstance;

        beforeEach(() => {
            unit = createTestUnit({ status: { corroded: 5 } });
            effectInstance = { id: 'effectInTest', value: 5 };
            unit.skills[effectType].push(effectInstance);
        });

        it(`should NOT wear off when ${timer} is greater than zero`, () => {
            unit.status[timer] = 2;

            executeSkill(effectInstance, unit);

            expect(unit.skills.turnEnd.length, `removed from ${effectType} skills`).to.equal(1);
        });

        it(`should wear off when ${timer} is reduced to zero`, () => {
            unit.status[timer] = 1;

            executeSkill(effectInstance, unit);

            expect(unit.skills.turnEnd.length, `removed from ${effectType} skills`).to.equal(0);
        });
    });
}

export function clearStatusesWhenTimer({ executeSkill }, timer, statuses) {
    describe('effect clears status when worn off', () => {
        let unit,
            effectInstance;

        beforeEach(() => {
            unit = createTestUnit();
            effectInstance = { id: 'effectInTest', value: 5 };
        });

        statuses.forEach((status) => {
            it(`should NOT clear ${status} status when ${timer} is greater than zero`, () => {
                unit.status[timer] = 2;
                unit.status[status] = 5;

                executeSkill(effectInstance, unit);

                expect(unit.status[status]).to.be.greaterThan(0);
            });

            it(`should clear ${status} status when ${timer} is reduced to zero`, () => {
                unit.status[timer] = 1;
                unit.status[status] = 5;

                executeSkill(effectInstance, unit);

                expect(unit.status[status]).to.equal(0);
            });
        });
    });
}


export function shouldNeverWearOff({ executeSkill, effectType }) {
    describe('effect NEVER wears off', () => {
        let unit,
            effectInstance;

        beforeEach(() => {
            unit = createTestUnit({ status: { corroded: 5 } });
            effectInstance = { id: 'effectInTest', value: 5 };
            unit.skills[effectType].push(effectInstance);
        });

        [0, 1, 2].forEach((value) => {
            it(`should NOT wear off`, () => {
                Object.keys(unit.status).forEach((key) => unit.status[key] = value);

                executeSkill(effectInstance, unit);

                expect(unit.skills[effectType].length, `NOT removed from ${effectType} skills`).to.equal(1);
            });
        });
    });
}

export function makeSkillTestState(effect, effectType) {
    function executeSkill(effectInstance, unit) {
        effect.apply(effectInstance, unit);
    }

    return {
        skill: effect,
        target: 'unit',
        effectType,
        executeSkill,
        affectedStatuses: []
    };
}
