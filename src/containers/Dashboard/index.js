import React, {useContext, useEffect} from 'react';
import {AppGlobalContext} from "../../Common/Components/AppGlobalContext";

const Dashboard = props => {
    const [appGlobalContext, setAppGlobalContext] = useContext(AppGlobalContext);
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