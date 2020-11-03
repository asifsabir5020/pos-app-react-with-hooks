import React from 'react';
import { Layout as ALayout, Menu, Dropdown, Row, Col } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import {BarcodeOutlined, BarChartOutlined, DownOutlined, LogoutOutlined} from '@ant-design/icons';
import './../../App.css';
import { removeTokenAndUser} from "../Auth/utils";

const { Header, Content, Footer, Sider } = ALayout;

const Layout = props => {
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
        <ALayout>
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
                    <Menu.Item key="2" icon={<BarcodeOutlined />}>
                        <Link to="/product-category">Product Category</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <ALayout className="site-layout" style={{ marginLeft: 200 }}>
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
                        {props.children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>POS - React App With Hooks</Footer>
            </ALayout>
        </ALayout>
    );
}

export default Layout;