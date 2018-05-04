export function orListFromArray(array) {
    return array.reduce((orList, item, i, array) => {
        let separator = (
            !i ? ''
                : i === array.length - 1
                    ? ' or '
                    : ', '
        );

        return orList + separator + item;
    });
}