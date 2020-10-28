import * as sorter from './../../Common/utiles/sorters';

export const columns = () => {
    return [
        {
            title: 'Id',
            dataIndex: '_id',
            key: '_id',
            sorter: (a, b) => sorter.characterSorter(a,b, '_id'),
        },
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => sorter.characterSorter(a,b, 'title'),
        }
    ];
};