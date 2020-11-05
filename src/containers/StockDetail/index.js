import React, { useState} from 'react';
import { Input, Modal} from "antd";
import {STOCK_API_URL} from "./constants";
import { columns} from "./columns";
import ProductCategoryForm from "./ProductCategoryForm";
import Table from "../../Common/Components/Table";
import useFetch from "../../Common/hooks/useFetch";

const ProductCategory = () => {
    const [selectedRecord, setSelectedRecord] = useState({});
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [fetchListDep, setFetchListDep] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const refreshList = () => setFetchListDep(fetchListDep + 1);
    const isEditMode = Object.keys(selectedRecord).length > 0;

    const { filteredData: data, loading } = useFetch(STOCK_API_URL, {
        config: { params: {} },
        deps: [fetchListDep],
        searchQuery
    });

    const finalData = data && data.map(item => {
        return {
            ...item,
            productTitle: item.product && item.product.title,
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
                customToolbar={() => (<></>)}
                customeSearchRender={() => (
                    <Input placeholder="Search" onChange={e => setSearchQuery(e.target.value)}/>
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
                    refreshList={refreshList}
                />
            </Modal>
        </div>

    );
};
export default ProductCategory;