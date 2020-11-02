import React from 'react';
import {  Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import Login from "./containers/Auth/Login/Loadable";
import Error404 from './Common/Components/Error404';
import Dashboard from "./containers/Dashboard/Loadable";
import UserAccount from "./containers/UserAccount/Loadable";
import Sales from "./containers/Sales/Loadable";
import { isAuthenticatedUser} from "./containers/Auth/utils";
import Layout from "./containers/Layout/Loadable";
import {AppGlobalContextProvider} from "./Common/Components/AppGlobalContext";

const Auth = () => (
    <Switch>
        <Route exact path="/auth/login" component={Login} />
    </Switch>
);

const AppLayout = () => {
    return (
        <AppGlobalContextProvider>
            <Layout>
                <Switch>
                    <Route path='/' component={Dashboard} exact/>
                    <Route path='/dashboard' component={Dashboard} exact/>
                    <Route path='/sales' component={Sales}/>
                    <Route path='/user-account' component={UserAccount}/>
                    <Route component={Error404} />
                </Switch>
            </Layout>
        </AppGlobalContextProvider>
    );
}



const App = () => {
    return (
        <>
            <Switch>
                <Route path="/auth" component={Auth} />
                {isAuthenticatedUser() ? (
                    <Route path="/" component={AppLayout} />
                ) : (
                    <Redirect to="/auth/login" />
                )}
            </Switch>
        </>
    );
}

export default withRouter(App);
