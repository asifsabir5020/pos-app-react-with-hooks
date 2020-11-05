import React from 'react';
import axios from 'axios';
import {message, Modal} from 'antd';
import { ExclamationCircleOutlined} from '@ant-design/icons';
import * as sorter from './../../Common/utiles/sorters';
import CustomIcon from "../../Common/Components/CustomIcon";
import {throwServerError} from "../../Common/utiles/throwServerError";
import {PURCHASE_API_URL} from "./constants";

export const columns = ({ setSelectedRecord, setShouldShowModal, refreshList}) => {

    const handleDelete = async record => {
        try {
            await axios.delete(`${PURCHASE_API_URL}/${record._id}`);
            await refreshList();
            await setSelectedRecord({});
            message.success('Purchase Deleted Successfully!');
        } catch (e) {
            throwServerError(e);
        }
    }

    return [
        {
            title: 'Product',
            dataIndex: 'productTitle',
            key: 'productTitle',
            sorter: (a, b) => sorter.characterSorter(a,b, 'productTitle'),
        },
        {
            title: 'Vendor',
            dataIndex: 'vendorName',
            key: 'vendorName',
            sorter: (a, b) => sorter.characterSorter(a,b, 'vendorName'),
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            sorter: (a, b) => sorter.numberSorter(a,b, 'quantity'),
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
                                content: 'Do you want to delete this Purchase?',
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