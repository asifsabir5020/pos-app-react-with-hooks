import React from 'react';
import { Layout, Menu } from 'antd';
import {  Route, Switch, Link } from 'react-router-dom';
import {ApartmentOutlined} from '@ant-design/icons';
import './App.css';
import Error404 from './Common/Components/Error404';
import ProductCategory from "./containers/ProductCategory";

const { Header, Content, Footer, Sider } = Layout;

function App() {
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
                  PoS
              </div>
              <Menu theme="light" mode="inline" defaultSelectedKeys={['4']}>
                  <Menu.Item key="1" icon={<ApartmentOutlined />}>
                      <Link to="/">Product Category</Link>
                  </Menu.Item>
              </Menu>
          </Sider>
          <Layout className="site-layout" style={{ marginLeft: 200 }}>
              <Header className="site-layout-background" style={{ padding: 0 }} />
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                  <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                      <Switch>
                          <Route path='/' component={ProductCategory} exact/>
                          <Route component={Error404} />
                      </Switch>
                  </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>POS - React App With Hooks</Footer>
          </Layout>
      </Layout>
  );
}

export default App;
