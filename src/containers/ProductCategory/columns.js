import * as sorter from './../../Common/utiles/sorters';

export const columns = () => {
    return [
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
            sorter: (a, b) => sorter.characterSorter(a,b, 'title'),
        }
    ];
};