import React, {useContext, useEffect} from 'react';
import {Link, Route, Switch, withRouter} from "react-router-dom";
import {Menu} from "antd";
import {ApartmentOutlined, BankOutlined, BarcodeOutlined} from '@ant-design/icons';
import Product from "../Product/Loadable";
import ProductCategory from "../ProductCategory/Loadable";
import StockDetail from '../StockDetail/Loadable';
import Error404 from "../../Common/Components/Error404";
import {AppGlobalContext} from "../../Common/Components/AppGlobalContext";


const Stock = props => {
    const [appGlobalContext, setAppGlobalContext] = useContext(AppGlobalContext);
    useEffect(() => {
        setAppGlobalContext({...appGlobalContext, sectionTitle: 'Stock'});
    },[]);
    const { history } = props;
    const handleClick = e => {
        history.replace(`${e.key}`);
    };
    return (
        <div>
            <div>
                <Menu onClick={handleClick} selectedKeys={[history.location.pathname]} mode="horizontal">
                    <Menu.Item key="/stock" icon={<BankOutlined />}>
                        <Link to="/stock">Stock</Link>
                    </Menu.Item>
                    <Menu.Item key="/stock/product" icon={<BarcodeOutlined />}>
                        <Link to="/stock/product">Product</Link>
                    </Menu.Item>
                    <Menu.Item key="/stock/product-category" icon={<ApartmentOutlined />}>
                        <Link to="/stock/product-category">Product Category</Link>
                    </Menu.Item>
                </Menu>
            </div>
            <div style={{ marginTop: 25}}>
                <Switch>
                    <Route path='/stock' component={StockDetail} exact/>
                    <Route path='/stock/product' component={Product} exact/>
                    <Route path='/stock/product-category' component={ProductCategory} exact/>
                    <Route component={Error404} />
                </Switch>
            </div>
        </div>
    );
}

export default withRouter(Stock);