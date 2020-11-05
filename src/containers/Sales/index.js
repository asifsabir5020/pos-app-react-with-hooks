import React, {useContext, useEffect} from 'react';
import { withRouter} from "react-router-dom";
import {AppGlobalContext} from "../../Common/Components/AppGlobalContext";


const Sales = props => {
    const [appGlobalContext, setAppGlobalContext] = useContext(AppGlobalContext);
    useEffect(() => {
        setAppGlobalContext({...appGlobalContext, sectionTitle: 'Sales'});
    },[]);
    return (
        <div>
            <h2>Sales!!!</h2>
        </div>
    );
}

export default withRouter(Sales);