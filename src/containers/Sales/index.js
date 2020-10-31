import React, {useState} from 'react';
import {Link, Route, Switch, withRouter} from "react-router-dom";
import {Menu} from "antd";
import {MailOutlined} from '@ant-design/icons';
import Product from "../Product";
import ProductCategory from "../ProductCategory";
import Error404 from "../../Common/Components/Error404";


const Sales = props => {
    const { history } = props;
    const [current, setCurrent] = useState();
    const handleClick = e => {
        setCurrent(e.key);
        history.replace(`${e.key}`);
    };
    return (
        <div>
            <div>
                <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="/sales" icon={<MailOutlined />}>
                        <Link to="/sales">Product</Link>
                    </Menu.Item>
                    <Menu.Item key="/sales/product-category" icon={<MailOutlined />}>
                        <Link to="/sales/product-category">Product Category</Link>
                    </Menu.Item>
                </Menu>
            </div>
            <div style={{ marginTop: 25}}>
                <Switch>
                    <Route path='/sales' component={Product} exact/>
                    <Route path='/sales/product-category' component={ProductCategory} exact/>
                    <Route component={Error404} />
                </Switch>
            </div>
        </div>
    );
}

export default withRouter(Sales);