import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {PRODUCT_CATEGORY_API_URL} from "./constants";
import { columns} from "./columns";
import Table from "../../Common/Components/Table";

const ProductCategory = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        (async function fetch() {
            const response = await axios.get(PRODUCT_CATEGORY_API_URL);
            setData(response.data);
         })();
    },[]);
    return (
        <div>
            <h2>Product Category!</h2>
            <Table dataSource={data} columns={columns()} rowKey="_id"/>
        </div>

    );
};

export default ProductCategory;