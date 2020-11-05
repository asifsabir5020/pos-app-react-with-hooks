import React from 'react';
import PermissionsForm from "./PermissionsForm";

const UserAccount = ({ selectedRecord,setShouldShowPermissionsModal, setSelectedRecord }) => {
    return (
        <div>
            <PermissionsForm
                selectedRecord={selectedRecord}
                setShouldShowPermissionsModal={setShouldShowPermissionsModal}
                setSelectedRecord={setSelectedRecord}
            />
        </div>
    );
};
export default UserAccount;