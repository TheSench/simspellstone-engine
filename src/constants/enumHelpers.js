export function reverseEnum(origEnum) {
    return Object.getOwnPropertyNames(origEnum).reduce((mapping, name) => {
        let value = origEnum[name];
        mapping[value] = name;
        return mapping;
    }, {});
}