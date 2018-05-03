export function reverseMap(origEnum) {
  return Object.entries(origEnum).reduce((mapping, [name, value]) => {
    mapping[value] = name;
    return mapping;
  }, {});
}
