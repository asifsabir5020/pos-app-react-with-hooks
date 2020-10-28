import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Input, Modal} from "antd";
import {PRODUCT_CATEGORY_API_URL} from "./constants";
import { columns} from "./columns";
import {throwServerError} from "../../Common/utiles/throwServerError";
import ProductCategoryForm from "./ProductCategoryForm";
import filter from "../../Common/utiles/sorters/filter";
import Table from "../../Common/Components/Table";
import AButton from "../../Common/Components/Input/AButton";

const ProductCategory = () => {
    const [state, setState] = useState({ data: [], filteredData: [] });
    const [shouldShowModal, setShouldShowModal] = useState(false);
    useEffect(() => {
        (async function fetch() {
            try{
                const { data } = await axios.get(PRODUCT_CATEGORY_API_URL);
                setState({data, filteredData: data});
            }catch (e){
                setState({ data: [], filteredData: [] });
                throwServerError(e);
            }
         })();
    },[]);
    return (
        <div>
            <Table
                dataSource={state.filteredData}
                columns={columns()}
                showSorterTooltip={false}
                scroll={{ y: 500 }}

                customToolbar={() => (
                    <AButton
                        type="primary"
                        onClick={() => setShouldShowModal(!shouldShowModal)}
                    >
                        Add
                    </AButton>
                )}
                customeSearchRender={() => (
                    <Input placeholder="Search" onChange={e => {
                        setState({...state, filteredData: filter(state.data, e.target.value)});
                    }}/>
                )}
            />
            <Modal
                title="Category Modal"
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