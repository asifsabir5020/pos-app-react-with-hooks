import React, { useState, useEffect} from 'react';
import { Input, Modal} from "antd";
import axios from 'axios';
import {PRODUCT_CATEGORY_API_URL} from "./constants";
import { columns} from "./columns";
import ProductCategoryForm from "./ProductCategoryForm";
import Table from "../../Common/Components/Table";
import AButton from "../../Common/Components/Input/AButton";

const ProductCategory = () => {
    const [selectedRecord, setSelectedRecord] = useState({});
    const [fetchedList, setFetchedList] = useState([]);
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const isEditMode = Object.keys(selectedRecord).length > 0;

    useEffect(() => {
        (async () => {
            const response = await axios.get(PRODUCT_CATEGORY_API_URL);
            setFetchedList(response.data);
        })();
    }, []);
    return (
        <div>
            <Table
                dataSource={fetchedList}
                columns={columns({ setSelectedRecord, setShouldShowModal})}
                showSorterTooltip={false}
                scroll={{ y: 500 }}
                onRow={record => ({
                    onClick: e => {
                        if(record._id !== selectedRecord._id){
                            setSelectedRecord(record);
                        }
                    }
                })}
                customToolbar={() => (
                    <>
                        <AButton
                            type="primary"
                            onClick={() => setShouldShowModal(!shouldShowModal)}
                        >
                            Add
                        </AButton>
                    </>
                )}
                customeSearchRender={() => (
                    <Input placeholder="Search" />
                )}
            />
            <Modal
                title={isEditMode ? 'Modify Category':'Add Category'}
                visible={shouldShowModal}
                onCancel={() => {
                    setShouldShowModal(false);
                    setSelectedRecord({});
                }}
                footer={false}
                maskClosable={false}
            >
                <ProductCategoryForm
                    selectedRecord={selectedRecord}
                    isEditMode={isEditMode}
                    setShouldShowModal={setShouldShowModal}
                    setSelectedRecord={setSelectedRecord}
                />
            </Modal>
        </div>

    );
};
export default ProductCategory;