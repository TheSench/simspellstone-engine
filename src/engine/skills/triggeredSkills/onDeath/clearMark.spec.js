import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';
import { clearMark } from './../../skills';
import { default as describeSkill } from './onDeath.spec';

describeSkill('clearMark', () => {
    let theClearMarkSkill = theTurnSkill(clearMark);

    describe('effects', () => {
      theClearMarkSkill.isNotImplemented;

      it('should clear markTarget from all units marking this unit');
    });
});
