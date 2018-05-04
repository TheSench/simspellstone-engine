import { expect } from 'chai';
import { valor } from './../../skills';
import { createTestUnit } from '../../../unitFactory/unitFactory';

describe('valor', () => {
    describe('effects', () => {
        let target;

        beforeEach(() => {
            target = createTestUnit();
        });

        it('should affect target', () => {
            let affected = valor.affectTarget(null, null, target, 5);
            expect(affected).to.equal(true);
        });

        it(`should set attackValor to value`, () => {
            valor.affectTarget(null, null, target, 5);
            expect(target.status.attackValor, 'attackValor').to.equal(5);
        });

        it(`should set valorTriggered to true`, () => {
            valor.affectTarget(null, null, target, 5);
            expect(target.status.valorTriggered, 'valorTriggered').to.be.true;
        });

        it(`should ONLY modify attackValor and valorTriggered`, () => {
            let expectedStatus = Object.assign({}, target.status, { attackValor: 5, valorTriggered: true });
            valor.affectTarget(null, null, target, 5);
            expect(target.status, "target.status").to.deep.equal(expectedStatus);
        });
    });
});
