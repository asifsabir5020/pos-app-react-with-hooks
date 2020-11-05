import React, {useContext, useEffect, useState} from 'react';
import {AppGlobalContext} from "../../Common/Components/AppGlobalContext";
import useFetch from "../../Common/hooks/useFetch";
import {DASHBOARD_API_URL} from "./constatnts";

const Dashboard = props => {
    const [appGlobalContext, setAppGlobalContext] = useContext(AppGlobalContext);
    const [fetchListDep, setFetchListDep] = useState(0);
    const refreshList = () => setFetchListDep(fetchListDep + 1);

    const { filteredData: data, loading } = useFetch(DASHBOARD_API_URL, {
        config: { params: {} },
        deps: [fetchListDep],
    });

    useEffect(() => {
        setAppGlobalContext({...appGlobalContext, sectionTitle: 'Dashboard'});
    },[]);
    return (
        <div>
            <h2>Dashboard</h2>
        </div>
    );
};
export default Dashboard;