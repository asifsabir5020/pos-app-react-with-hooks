import React, {useContext, useEffect, useState} from 'react';
import { Input, Row, Col} from "antd";
import {PRODUCT_API_URL} from "./constants";
import { columns} from "./columns";
import CartForm from "./CartForm";
import Table from "../../Common/Components/Table";
import useFetch from "../../Common/hooks/useFetch";
import {AppGlobalContext} from "../../Common/Components/AppGlobalContext";

const Product = () => {
    const [appGlobalContext, setAppGlobalContext] = useContext(AppGlobalContext);
    const [selectedRecord, setSelectedRecord] = useState({});
    const [fetchListDep, setFetchListDep] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProductList, setSelectedProductList] = useState([]);
    const refreshList = () => setFetchListDep(fetchListDep + 1);

    useEffect(() => {
        setAppGlobalContext({...appGlobalContext, sectionTitle: 'Sales'});
    },[]);

    const { filteredData: data, loading } = useFetch(PRODUCT_API_URL, {
        config: { params: {} },
        deps: [fetchListDep],
        searchQuery
    });

    const finalData = data && data.map(item => {
        return {
            ...item,
            productTitle: item.product && item.product.title
        }
    });

    const handleAddRecord = record => {
        const index = selectedProductList.findIndex(p => p._id === record._id);
        if(index === -1){
            setSelectedProductList([...selectedProductList, {...record, count: 1}]);
        }else{
            selectedProductList[index] = {...record, count: selectedProductList[index].count + 1};
        }
    }

    return (
        <div>
            <Row gutter={20}>
                <Col span={15}>
                    <h2>Product List</h2>
                    <Table
                        loading={loading}
                        dataSource={finalData}
                        columns={columns()}
                        showSorterTooltip={false}
                        scroll={{ y: 500 }}
                        onRow={record => ({
                            onClick:  e => {
                                setSelectedRecord(record); //: this must be removed and figure out
                                handleAddRecord(record);
                            }
                        })}
                        customToolbar={() => null}
                        customeSearchRender={() => (
                            <Input placeholder="Search" onChange={e => setSearchQuery(e.target.value)}/>
                        )}
                    />
                </Col>
                <Col span={9}>
                    <h2>Cart</h2>
                    <CartForm
                        selectedProductList={selectedProductList}
                        setSelectedProductList={setSelectedProductList}
                        refreshList={refreshList}
                    />
                </Col>
            </Row>
        </div>

    );
};
export default Product;