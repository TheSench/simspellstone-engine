import { backlash } from '../../skills';
import { theCombatSkill } from '../../skillTestCommon/skillTestBase.spec';
import { default as describeSkill } from './onDamaged.spec';

describeSkill('backlash', () => {
  let theBacklashSkill = theCombatSkill(backlash);

  describe('effects', () => {
    theBacklashSkill.givenTheAttacker
      .shouldDealDamage.equalToItsValue()
      .modifiedBy('protection', 'warded')
      .and.shouldAffectNoOtherStatuses();

    theBacklashSkill.givenTheDefender
      .shouldNotAffectAnyStatuses();

    it('should trigger on being prevented by shroud?');

    it('should trigger on being targetted by skills');
  });
});
