import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Modal} from "antd";
import {PRODUCT_CATEGORY_API_URL} from "./constants";
import { columns} from "./columns";
import Table from "../../Common/Components/Table";
import {throwServerError} from "../../Common/utiles/throwServerError";
import AButton from "../../Common/Components/Input/AButton";
import ProductCategoryForm from "./ProductCategoryForm";


const ProductCategory = () => {
    const [data, setData] = useState([]);
    const [shouldShowModal, setShouldShowModal] = useState(false);
    useEffect(() => {
        (async function fetch() {
            try{
                const response = await axios.get(PRODUCT_CATEGORY_API_URL);
                setData(response.data);
            }catch (e){
                setData([]);
                throwServerError(e);
            }
         })();
    },[]);
    return (
        <div>
            <h2>Product Category</h2>
            <AButton onClick={() => setShouldShowModal(!shouldShowModal)}>Add</AButton>
            <Table dataSource={data} columns={columns()} rowKey="_id"/>
            <Modal
                title="Basic Modal"
                visible={shouldShowModal}
                onCancel={() => setShouldShowModal(false)}
                footer={false}
            >
                <ProductCategoryForm/>
            </Modal>
        </div>

    );
};
export default ProductCategory;