function addToParentSuite(childSuite, parentSuite) {
  function Context() {}
  Context.prototype = parentSuite.ctx;
  childSuite.ctx = new Context();

  childSuite.parent.suites.pop();
  parentSuite.addSuite(childSuite);
}

function makeCategory(parentSuite) {
  function describeCategory(skillName, testFn) {
    return describe(skillName, function configureContext() {
      addToParentSuite(this, parentSuite);
      testFn.call(this);
    });
  }

  return {
    describe: describeCategory,
    describeSubcategory: function(categoryName) {
      const suite = describe(categoryName, () => {});
      addToParentSuite(suite, parentSuite)
      return makeCategory(suite);
    }
  };
}

export default function describeCategory(categoryName) {
  const suite = describe(categoryName, () => {});
  return makeCategory(suite);
}
