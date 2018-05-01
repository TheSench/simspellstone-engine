export function reverseMap(origEnum) {
  return Object.keys(origEnum).reduce((mapping, name) => {
    let value = origEnum[name];
    mapping[value] = name;
    return mapping;
  }, {});
}
