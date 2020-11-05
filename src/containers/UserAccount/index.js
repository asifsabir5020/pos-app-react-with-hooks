import React, {useContext, useEffect} from 'react';
import {Link, Route, Switch, withRouter} from "react-router-dom";
import {Menu} from "antd";
import {ApartmentOutlined, barCodeOutlined} from '@ant-design/icons';
import UserAccountLogin from '../UserAccountLogin/Loadable';
import Vendor from '../Vendor/Loadable';
import Customer from '../Customer/Loadable';
import Error404 from "../../Common/Components/Error404";
import {AppGlobalContext} from "../../Common/Components/AppGlobalContext";


const UserAccount = props => {
    const [appGlobalContext, setAppGlobalContext] = useContext(AppGlobalContext);
    useEffect(() => {
        setAppGlobalContext({...appGlobalContext, sectionTitle: 'User Account'});
    },[]);
    const { history } = props;
    const handleClick = e => {
        history.replace(`${e.key}`);
    };
    return (
        <div>
            <div>
                <Menu onClick={handleClick} selectedKeys={[history.location.pathname]} mode="horizontal">
                    <Menu.Item key="/user-account" icon={<barCodeOutlined />}>
                        <Link to="/user-account">User Login Accounts</Link>
                    </Menu.Item>
                    <Menu.Item key="/user-account/customer" icon={<barCodeOutlined />}>
                        <Link to="/user-account/customer">Customer</Link>
                    </Menu.Item>
                    <Menu.Item key="/user-account/vendor" icon={<ApartmentOutlined />}>
                        <Link to="/user-account/vendor">Vendor</Link>
                    </Menu.Item>
                </Menu>
            </div>
            <div style={{ marginTop: 25}}>
                <Switch>
                    <Route path='/user-account' component={UserAccountLogin} exact/>
                    <Route path='/user-account/customer' component={Customer} exact/>
                    <Route path='/user-account/vendor' component={Vendor} exact/>
                    <Route component={Error404} />
                </Switch>
            </div>
        </div>
    );
}

export default withRouter(UserAccount);