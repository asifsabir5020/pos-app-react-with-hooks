import * as sorter from './../../Common/utiles/sorters';

export const columns = () => {

    return [
        {
            title: 'Product',
            dataIndex: 'productTitle',
            key: 'productTitle',
            width: '80%',
            sorter: (a, b) => sorter.characterSorter(a,b, 'productTitle'),
        },
        {
            title: 'Stock',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '20%',
            sorter: (a, b) => sorter.numberSorter(a,b, 'quantity'),
        },
    ];
};