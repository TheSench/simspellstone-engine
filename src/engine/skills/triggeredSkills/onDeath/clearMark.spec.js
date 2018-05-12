import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';
import { clearMark } from './../../skills';

describe('clearMark', () => {
    let theClearMarkSkill = theTurnSkill(clearMark);

    describe('effects', () => {
      theClearMarkSkill.isNotImplemented;

      it('should clear markTarget from all units marking this unit');
    });
});
