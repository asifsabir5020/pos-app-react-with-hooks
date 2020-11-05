import React from 'react';
import axios from 'axios';
import {message, Modal} from 'antd';
import { ExclamationCircleOutlined} from '@ant-design/icons';
import * as sorter from './../../Common/utiles/sorters';
import CustomIcon from "../../Common/Components/CustomIcon";
import {throwServerError} from "../../Common/utiles/throwServerError";
import {VENDOR_API_URL} from "./constants";

export const columns = ({ setSelectedRecord, setShouldShowModal, refreshList}) => {

    const handleDelete = async record => {
        try {
            await axios.delete(`${VENDOR_API_URL}/${record._id}`);
            await refreshList();
            await setSelectedRecord({});
            message.success('Vendor Deleted Successfully!');
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
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
            sorter: (a, b) => sorter.characterSorter(a,b, 'contact'),
        },
        {
            title: 'Action',
            key: 'action',
            width: '10%',
            align: 'center',
            render: (text, record) => (
                <>
                    <CustomIcon type="edit" onClick={() => {
                        setSelectedRecord(record);
                        setShouldShowModal(true);
                    }} />
                    <CustomIcon
                        type="delete"
                        onClick={async () => {
                            Modal.confirm({
                                icon: <ExclamationCircleOutlined />,
                                content: 'Do you want to delete this Vendor?',
                                okText: 'Yes',
                                cancelText: 'No',
                                onOk() {
                                    handleDelete(record);
                                },
                            });
                        }}
                    />
                </>
            )
        }
    ];
};