import { expect } from 'chai';
import { reverseEnum } from './enumHelpers';

describe('reverseEnum', () => {
    const origEnum = {
        prop0: 0,
        prop1: 1,
        prop2: 2
    };

    let reversed;

    beforeEach(() => {
        reversed = reverseEnum(origEnum)
    });

    it('make a reversed enum', () => {
        expect(reversed).to.deep.equal({
            0: 'prop0',
            1: 'prop1',
            2: 'prop2',
        });
    });
});