import React, {useContext, useEffect, useState} from 'react';
import { Input, Modal} from "antd";
import {PURCHASE_API_URL} from "./constants";
import { columns} from "./columns";
import PurchaseForm from "./PurchaseForm";
import Table from "../../Common/Components/Table";
import AButton from "../../Common/Components/Input/AButton";
import useFetch from "../../Common/hooks/useFetch";
import {AppGlobalContext} from "../../Common/Components/AppGlobalContext";

const Purchase = () => {
    const [appGlobalContext, setAppGlobalContext] = useContext(AppGlobalContext);
    const [selectedRecord, setSelectedRecord] = useState({});
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [fetchListDep, setFetchListDep] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const refreshList = () => setFetchListDep(fetchListDep + 1);
    const isEditMode = Object.keys(selectedRecord).length > 0;

    useEffect(() => {
        setAppGlobalContext({...appGlobalContext, sectionTitle: 'Purchase'});
    },[]);

    const { filteredData: data, loading } = useFetch(PURCHASE_API_URL, {
        config: { params: {} },
        deps: [fetchListDep],
        searchQuery
    });

    const finalData = data && data.map(item => {
        return {
            ...item,
            productTitle: item.product && item.product.title,
            vendorName: item.vendor && item.vendor.name,
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
                title={isEditMode ? 'Modify Purchase':'Add Purchase'}
                visible={shouldShowModal}
                onCancel={() => {
                    setShouldShowModal(false);
                    setSelectedRecord({});
                }}
                footer={false}
                maskClosable={false}
                width="25%"
                destroyOnClose
            >
                <PurchaseForm
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
export default Purchase;