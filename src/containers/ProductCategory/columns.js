import React from 'react';
import axios from 'axios';
import {message, Modal, Tooltip} from 'antd';
import { ExclamationCircleOutlined} from '@ant-design/icons';
import * as sorter from './../../Common/utiles/sorters';
import CustomIcon from "../../Common/Components/CustomIcon";
import {throwServerError} from "../../Common/utiles/throwServerError";
import {PRODUCT_CATEGORY_API_URL} from "./constants";

export const columns = ({ setSelectedRecord, setShouldShowModal, refreshList}) => {

    const handleDelete = async record => {
        try {
            await axios.delete(`${PRODUCT_CATEGORY_API_URL}/${record._id}`);
            await refreshList();
            await setSelectedRecord({});
            message.success('Product Category Deleted Successfully!');
        } catch (e) {
            throwServerError(e);
        }
    }

    return [
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
                    <CustomIcon type="edit" onClick={() => {
                        setSelectedRecord(record);
                        setShouldShowModal(true);
                    }} />
                    <CustomIcon
                        type="delete"
                        onClick={async () => {
                            Modal.confirm({
                                icon: <ExclamationCircleOutlined />,
                                content: 'Do you want to delete this Product Category?',
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