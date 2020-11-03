import React from 'react';
import axios from 'axios';
import {message, Switch} from 'antd';
import * as sorter from './../../Common/utiles/sorters';
import {throwServerError} from "../../Common/utiles/throwServerError";
import { USER_STATUS_TOGGLE_API_URL} from "./constants";

export const columns = ({ setSelectedRecord, refreshList}) => {

    const handleStatusToggle = async record => {
        try {
            await axios.put(`${USER_STATUS_TOGGLE_API_URL}/${record._id}`, {
                status: !record.status,
            });
            await refreshList();
            await setSelectedRecord({});
            message.success('User Status Updated Successfully!');
        } catch (e) {
            throwServerError(e);
        }
    }

    return [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => sorter.characterSorter(a,b, 'name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            sorter: (a, b) => sorter.characterSorter(a,b, 'email'),
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            sorter: (a, b) => sorter.characterSorter(a,b, 'role'),
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            align: 'center',
            render: (text, record) => (
                <>
                    <Switch checked={record.status} onChange={() => handleStatusToggle(record)}/>
                </>
            )
        }
    ];
};