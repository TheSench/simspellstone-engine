import { shouldDealDamageEqualToValue, shouldDealExactlyXDamage, testDamageModifiers } from './testDamage.spec';
import { shouldHealDamageEqualToValue, shouldHealExactlyXDamage } from './testHealing.spec';
import { testNegation } from './testNegation.spec';
import { testPotentialTargets } from './testPotentialTargets.spec';
import { shouldApplyStatus, shouldChangeStateTo, shouldNotApplyStatusesOtherThan } from './testStatusApplication.spec';
import { testTargetting } from './testTargetting.spec';


export function theSkill(skill) {
    return {
        shouldTarget: {
            allOpposingUnits: () => testPotentialTargets.allOpposingUnits(skill),
            theDirectlyOpposingUnit: () => testPotentialTargets.theDirectlyOpposingUnit(skill),
            theDirectlyOpposingUnitOrCommander: () => testPotentialTargets.theDirectlyOpposingUnitOrCommander(skill),
            opposingUnitsInACone: () => testPotentialTargets.opposingUnitsInACone(skill),
            allAlliedUnits: () => testPotentialTargets.allAlliedUnits(skill),
            adjacentAlliedUnits: () => testPotentialTargets.adjacentAlliedUnits(skill),
            itself: () => testPotentialTargets.itself(skill)
        },
        shouldOnlyAffect: {
            targetsThatAreAlive: () => testTargetting(skill, ['active', 'activeNextTurn', 'inactive', 'frozen', 'weakened']),
            targetsThatAreActive: () => testTargetting(skill, ['active', 'weakened']),
            targetsThatWillBeActive: () => testTargetting(skill, ['active', 'activeNextTurn', 'weakened']),
            targetsThatWillAttack: () => testTargetting(skill, ['active', 'activeNextTurn'])
        },
        shouldBeNegatedBy: {
            invisible: () => testNegation(skill, 'invisible'),
            nullified: () => testNegation(skill, 'nullified'),
            nothing: () => testNegation(skill, null),
        },
        shouldDealDamage: {
            equalToItsValue() {
                shouldDealDamageEqualToValue(skill);
                return this;
            },
            equalTo(damage) {
                shouldDealExactlyXDamage(skill, damage);
                return this;
            },
            modifiedBy(...modifiers) {
                testDamageModifiers(skill, modifiers);
                return this;
            }
        },
        shouldHealDamage: {
            equalToItsValue: () => shouldHealDamageEqualToValue(skill),
            equalTo: (damage) => shouldHealExactlyXDamage(skill, damage)
        },
        shouldNotApplyAnyStatuses: () => shouldApplyStatus(skill),
        shouldOnlyAffectTheStatus(status) {
            shouldNotApplyStatusesOtherThan(skill, [status]);
            return this.shouldApplyTheStatus(status);
        },
        shouldApplyTheStatus(status) {
            return {
                stackingWithCurrentValue: () => shouldApplyStatus(skill, status, true),
                keepingHighestValue: () => shouldApplyStatus(skill, status, false),
                replacingCurrentValue: () => shouldApplyStatus(skill, status, 'replace'),
                replacingCurrentValueWith: (value) => shouldApplyStatus(skill, status, false, value)
            }
        },
        shouldNotAffectStatusesOtherThan: (...statuses) => shouldNotApplyStatusesOtherThan(skill, statuses),
        shouldChangeStateOfTargetTo: (state) => shouldChangeStateTo(skill, state)
    }
}
