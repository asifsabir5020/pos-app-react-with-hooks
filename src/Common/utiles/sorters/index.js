export const characterSorter = (a, b, property) => {
    let first = a[property] || '';
    let second = b[property] || '';
    first = first.toString().toLowerCase();
    second = second.toString().toLowerCase();
    return first < second ? -1 : 1;
};

export const numberSorter = (a, b, property) => {
    const first = a[property] || -Number.MAX_VALUE;
    const second = b[property] || -Number.MAX_VALUE;
    return parseInt(first, 10) - parseInt(second, 10);
};

export const floatSorter = (a, b, property) => {
    const first = a[property] || 0;
    const second = b[property] || 0;
    return parseFloat(first) - parseFloat(second);
};

export const boolSorter = (a, b, property) => {
    const first = a[property] || false;
    const second = b[property] || false;
    return first - second;
};