import React  from 'react';
import {  Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import Login from "./containers/Auth/Login";
import Error404 from './Common/Components/Error404';
import Dashboard from "./containers/Dashboard";
import ProductCategory from "./containers/ProductCategory"
import { isAuthenticatedUser} from "./containers/Auth/utils";
import Layout from "./containers/Layout";

const Auth = () => (
    <Switch>
        <Route exact path="/auth/login" component={Login} />
    </Switch>
);

const AppLayout = () => {

    return (
            <Layout>
                <Switch>
                    <Route path='/' component={Dashboard} exact/>
                    <Route path='/dashboard' component={Dashboard} exact/>
                    <Route path='/product-category' component={ProductCategory}/>
                    <Route component={Error404} />
                </Switch>
            </Layout>
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
