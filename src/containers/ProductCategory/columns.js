import React from 'react';
import axios from 'axios';
import {message, Modal} from 'antd';
import { ExclamationCircleOutlined} from '@ant-design/icons';
import * as sorter from './../../Common/utiles/sorters';
import ActionIcon from "../../Common/Components/ActionIcon";
import {throwServerError} from "../../Common/utiles/throwServerError";
import {PRODUCT_CATEGORY_API_URL} from "./constants";


export const columns = ({selectedRecord, setSelectedRecord, setShouldShowModal, refreshList}) => {

    const handleDeleteClick = async () => {
        try {
            await axios.delete(`${PRODUCT_CATEGORY_API_URL}/${selectedRecord._id}`);
            await refreshList();
            message.success('Product Category Deleted Successfully!');
        } catch (e) {
            throwServerError(e);
        }
    };

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
                    <ActionIcon
                        type="delete"
                        onClick={() => {
                            Modal.confirm({
                                icon: <ExclamationCircleOutlined />,
                                content: 'Do you want to delete this record?',
                                okText: 'Yes',
                                cancelText: 'No',
                                onOk() {
                                    handleDeleteClick()
                                },
                            });
                        }}
                    />
                </>
            )
        }
    ];
};