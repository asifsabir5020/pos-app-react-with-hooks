import React from 'react';
import axios from 'axios';
import {message, Modal} from 'antd';
import { ExclamationCircleOutlined} from '@ant-design/icons';
import ActionIcon from "../../Common/Components/ActionIcon";
import {PRODUCT_CATEGORY_API_URL} from "./constants";

export const columns = ({ setSelectedRecord, setShouldShowModal}) => {

    const handleDelete = async record => {
        try {
            await axios.delete(`${PRODUCT_CATEGORY_API_URL}/${record._id}`);
            await setSelectedRecord({});
            message.success('Product Category Deleted Successfully!');
        } catch (e) {
            console.error(e)
        }
    }

    return [
        {
            title: 'Name',
            dataIndex: 'title',
            key: 'title',
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