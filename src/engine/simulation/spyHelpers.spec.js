import { expect } from 'chai';

export function verifyCallOrder(spies) {
  for (var i = 0; i < spies.length - 1; i++) {
    expect(spies[i].calledImmediatelyBefore(spies[i + 1]), `step ${i} called before ${i + 1}`).to.be.true;
  }
  var lastSpy = spies.length - 1;
  expect(spies[lastSpy].calledImmediatelyAfter(spies[lastSpy - 1]), `step ${lastSpy} called after ${lastSpy - 1}`).to.be.true;
}

export function verifyCallCounts(expectedCount, spies) {
  spies.forEach((spy) => {
    expect(spy.callCount).to.equal(expectedCount);
  });
}
