import React from 'react';
import axios from 'axios';
import {message, Modal, Tooltip} from 'antd';
import { ExclamationCircleOutlined} from '@ant-design/icons';
import * as sorter from './../../Common/utiles/sorters';
import CustomIcon from "../../Common/Components/CustomIcon";
import {throwServerError} from "../../Common/utiles/throwServerError";
import {STOCK_API_URL} from "./constants";

export const columns = ({ setSelectedRecord, setShouldShowModal, refreshList}) => {

    const handleDelete = async record => {
        try {
            await axios.delete(`${STOCK_API_URL}/${record._id}`);
            await refreshList();
            await setSelectedRecord({});
            message.success('Product Category Deleted Successfully!');
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
                    <CustomIcon onClick={() => {
                        // setSelectedRecord(record);
                        // setShouldShowModal(true);
                    }} />
                </>
            )
        }
    ];
};