import React, { useState} from 'react';
import { Input, Modal} from "antd";
import {PRODUCT_API_URL} from "./constants";
import { columns} from "./columns";
import ProductForm from "./ProductForm";
import Table from "../../Common/Components/Table";
import AButton from "../../Common/Components/Input/AButton";
import useFetch from "../../Common/hooks/useFetch";

const Product = () => {
    const [selectedRecord, setSelectedRecord] = useState({});
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [fetchListDep, setFetchListDep] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const refreshList = () => setFetchListDep(fetchListDep + 1);
    const isEditMode = Object.keys(selectedRecord).length > 0;

    const { filteredData: data, loading } = useFetch(PRODUCT_API_URL, {
        config: { params: {} },
        deps: [fetchListDep],
        searchQuery
    });

    const finalData = data && data.map(item => {
        return {
            ...item,
            productCategory: item.category && item.category.title
        }
    });

    return (
        <div>
            <Table
                loading={loading}
                dataSource={finalData}
                columns={columns({ setSelectedRecord, setShouldShowModal, refreshList})}
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
                    <Input placeholder="Search" onChange={e => setSearchQuery(e.target.value)}/>
                )}
            />
            <Modal
                title={isEditMode ? 'Modify Product':'Add Product'}
                visible={shouldShowModal}
                onCancel={() => {
                    setShouldShowModal(false);
                    setSelectedRecord({});
                }}
                footer={false}
                maskClosable={false}
                width="40%"
            >
                <ProductForm
                    selectedRecord={selectedRecord}
                    isEditMode={isEditMode}
                    setShouldShowModal={setShouldShowModal}
                    setSelectedRecord={setSelectedRecord}
                    refreshList={refreshList}
                />
            </Modal>
        </div>

    );
};
export default Product;