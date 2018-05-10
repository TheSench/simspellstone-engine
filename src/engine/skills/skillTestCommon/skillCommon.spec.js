import { createTestUnit } from '../../unitFactory/unitFactory';
import { testDamageModifiers, testHealingOrDamage } from '../skillTestsConsolidated/damageTests.spec';
import { testNegation } from './testNegation.spec';
import { testPotentialTargets } from './testPotentialTargets.spec';
import { shouldApplyStatus, shouldChangeStateTo, shouldNotApplyStatusesOtherThan } from './testStatusApplication.spec';
import { testTargetting } from './testTargetting.spec';


export function theSkill(skill) {
  var testState = makeSkillTestState(skill);
  return {
    shouldTarget: {
      allOpposingUnits: () => testPotentialTargets.allOpposingUnits(testState),
      theDirectlyOpposingUnit: () => testPotentialTargets.theDirectlyOpposingUnit(testState),
      theDirectlyOpposingUnitOrCommander: () => testPotentialTargets.theDirectlyOpposingUnitOrCommander(testState),
      opposingUnitsInACone: () => testPotentialTargets.opposingUnitsInACone(testState),
      allAlliedUnits: () => testPotentialTargets.allAlliedUnits(testState),
      adjacentAlliedUnits: () => testPotentialTargets.adjacentAlliedUnits(testState),
      itself: () => testPotentialTargets.itself(testState)
    },
    shouldOnlyAffect: {
      targetsThatAreAlive: () => testTargetting(testState, ['active', 'activeNextTurn', 'inactive', 'frozen', 'weakened']),
      targetsThatAreActive: () => testTargetting(testState, ['active', 'weakened']),
      targetsThatWillBeActive: () => testTargetting(testState, ['active', 'activeNextTurn', 'weakened']),
      targetsThatWillAttack: () => testTargetting(testState, ['active', 'activeNextTurn'])
    },
    shouldBeNegatedBy: {
      invisible: () => testNegation(testState, 'invisible'),
      nullified: () => testNegation(testState, 'nullified'),
      nothing: () => testNegation(testState, null),
    },
    shouldDealDamage: {
      equalToItsValue() {
        testHealingOrDamage(testState, 'deal');
        return this;
      },
      equalTo(damage) {
        testHealingOrDamage(testState, 'deal', damage);
        return this;
      },
      modifiedBy(...modifiers) {
        testDamageModifiers(testState, modifiers);
        return this;
      }
    },
    shouldHealDamage: {
      equalToItsValue: () => testHealingOrDamage(testState, 'heal'),
      equalTo: (damage) => testHealingOrDamage(testState, 'heal', damage)
    },
    shouldNotApplyAnyStatuses: () => shouldApplyStatus(testState),
    shouldOnlyAffectTheStatus(status) {
      shouldNotApplyStatusesOtherThan(testState, [status]);
      return this.shouldApplyTheStatus(status);
    },
    shouldApplyTheStatus(status) {
      return {
        stackingWithCurrentValue: () => shouldApplyStatus(testState, status, true),
        keepingHighestValue: () => shouldApplyStatus(testState, status, false),
        replacingCurrentValue: () => shouldApplyStatus(testState, status, 'replace'),
        replacingCurrentValueWith: (value) => shouldApplyStatus(testState, status, false, value)
      }
    },
    shouldNotAffectStatusesOtherThan: (...statuses) => shouldNotApplyStatusesOtherThan(testState, statuses),
    shouldChangeStateOfTargetTo: (state) => shouldChangeStateTo(testState, state)
  }
}


function makeSkillTestState(skill) {
  function executeSkill(skillInstance, target) {
    let dummySource = createTestUnit();

    return skill.affectTarget(skillInstance, dummySource, target, skillInstance.value);
  }

  return {
    skill,
    executeSkill,
    affectedStatuses: []
  }
}
