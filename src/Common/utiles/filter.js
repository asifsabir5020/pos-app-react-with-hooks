// returns true if any of values of Map/Object contains searchQuery otherwise return false
export function shouldApplyFilter(object, query, columns) {
    // no need to search if searchQuery is empty --> return true for all
    if (!query || !query.replace(/\s/g, '').length) return true;

    // fields array to holds all values from the map for sake of comparison with searchQuery
    let values = [];
    let searchableObject = null;
    let searchableColumns = null;
    if (columns) {
        searchableColumns = columns.map(item => item.dataIndex);
    }

    if (searchableColumns) {
        searchableObject = {};
        searchableColumns.forEach(column => {
            searchableObject[column] = object[column];
        });
    } else {
        searchableObject = object;
    }
    values = Object.values(searchableObject);

    // slugify searchQuery
    const querySlug = query.toLowerCase().replace(/^\s+|\s+$/g, '');

    // return true if any of values contains searchQuery
    return values.some(value => {
        if (!value && value !== 0) return false;

        // slugify value
        const valueSlug = value
            .toString()
            .toLowerCase()
            .replace(/^\s+|\s+$/g, '');

        return valueSlug.includes(querySlug);
    });
}

function filter(data, searchQuery) {
    return data.filter(item => shouldApplyFilter(item, searchQuery));
}

export default filter;
