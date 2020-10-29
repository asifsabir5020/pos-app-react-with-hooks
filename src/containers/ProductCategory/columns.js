import React from 'react';
import * as sorter from './../../Common/utiles/sorters';
import ActionIcon from "../../Common/Components/ActionIcon";

export const columns = ({setSelectedRecord, setShouldShowModal}) => {
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
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            align: 'center',
            render: (text, record) => (
                <>
                    <ActionIcon type="edit" onClick={() => {
                        setSelectedRecord(record);
                        setShouldShowModal(true);
                    }} />
                    <ActionIcon type="delete" onClick={() => console.log('delete')}/>
                </>
            )
        }
    ];
};