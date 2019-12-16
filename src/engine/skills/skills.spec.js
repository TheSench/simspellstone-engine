const describeSkills = describe('skills', () => {});

 export default function describeSkill(skillName, testFn) {
  describe(skillName, function configureContext() {
    function Context() {}
    Context.prototype = describeSkills.ctx;
    this.ctx = new Context();

    this.parent.suites.pop();
    describeSkills.addSuite(this);

    testFn.call(this);
  });
}
