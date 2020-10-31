import React, { useState} from 'react';
import { Input, Modal} from "antd";
import {USER_API_URL} from "./constants";
import { columns} from "./columns";
import UserForm from "./UserForm";
import Table from "../../Common/Components/Table";
import AButton from "../../Common/Components/Input/AButton";
import useFetch from "../../Common/hooks/useFetch";

const UserAccount = () => {
    const [selectedRecord, setSelectedRecord] = useState({});
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [fetchListDep, setFetchListDep] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const refreshList = () => setFetchListDep(fetchListDep + 1);
    const isEditMode = Object.keys(selectedRecord).length > 0;

    const { filteredData: data, loading } = useFetch(USER_API_URL, {
        config: { params: {} },
        deps: [fetchListDep],
        searchQuery,
        callBack: () => {
            // setGlobalLoading(false);
            // console.log('callBack');
        },
        callBefore: () => {
            // setGlobalLoading(true);
            // console.log('callBefore');
        },
    });

    return (
        <div>
            <Table
                loading={loading}
                dataSource={data}
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
                title={isEditMode ? 'Modify User':'Add User'}
                visible={shouldShowModal}
                onCancel={() => {
                    setShouldShowModal(false);
                    setSelectedRecord({});
                }}
                footer={false}
                maskClosable={false}
                width="40%"
            >
                <UserForm
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
export default UserAccount;