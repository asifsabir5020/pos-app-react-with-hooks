import { useEffect, useState } from 'react';
import axios from 'axios';
import { showMessage } from 'containers/App/utils';

const useDelete = (api, options = {}) => {
    const { toBeDeletedId } = options;

    const [isRecordDeleted, setIsRecordDeleted] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        (async function() {
            if (toBeDeletedId) {
                try {
                    setDeleteLoading(true);
                    await axios.delete(`${api}/${toBeDeletedId}`);
                    setDeleteLoading(false);
                    setIsRecordDeleted(true);
                    showMessage({ message: 'record deleted' });
                } catch (e) {
                    setDeleteLoading(false);
                    setIsRecordDeleted(false); // TODO: shouldDelete should not be true fix in future
                    showMessage({ message: 'Error!', variant: 'error' });
                }
            }
        })();
    }, [toBeDeletedId]);

    return { deleteLoading, isRecordDeleted };
};

export default useDelete;
