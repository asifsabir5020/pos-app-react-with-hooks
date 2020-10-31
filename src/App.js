import React from 'react';
import { Layout, Menu, Dropdown, Row, Col } from 'antd';
import {  Route, Switch, Link, Redirect, withRouter, useHistory } from 'react-router-dom';
import {ApartmentOutlined, BarChartOutlined, DownOutlined, LogoutOutlined} from '@ant-design/icons';
import './App.css';
import Login from "./containers/Auth/Login";
import Error404 from './Common/Components/Error404';
import Dashboard from "./containers/Dashboard";
import UserAccount from "./containers/UserAccount";
import Sales from "./containers/Sales";
import {isAuthenticatedUser, removeTokenAndUser} from "./containers/Auth/utils";

const { Header, Content, Footer, Sider } = Layout;

const Auth = () => (
    <Switch>
        <Route exact path="/auth/login" component={Login} />
    </Switch>
);


const AppLayout = () => {
    const history = useHistory();
    const menu = (
        <Menu>
            <Menu.Item onClick={() => {
                removeTokenAndUser();
                localStorage.clear();
                history.replace('/auth/login');
            }}>
                <LogoutOutlined/> Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Layout>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
            >
                <div className="logo">
                    POS
                </div>
                <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
                    <Menu.Item key="1" icon={<BarChartOutlined />}>
                        <Link to="/dashboard">Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ApartmentOutlined />}>
                        <Link to="/sales">Sales</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ApartmentOutlined />}>
                        <Link to="/user-account">User Account</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Header className="site-layout-background" style={{ padding: 0 }} >
                    <Row>
                        <Col span={2} offset={22}>
                            <Dropdown overlay={menu}>
                              <span style={{ cursor: 'pointer'}}>
                                  User <DownOutlined />
                              </span>
                            </Dropdown>
                        </Col>
                    </Row>

                </Header>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                        <Switch>
                            <Route path='/' component={Dashboard} exact/>
                            <Route path='/dashboard' component={Dashboard} exact/>
                            <Route path='/sales' component={Sales}/>
                            <Route path='/user-account' component={UserAccount}/>
                            <Route component={Error404} />
                        </Switch>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>POS - React App With Hooks</Footer>
            </Layout>
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
