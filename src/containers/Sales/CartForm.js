import React   from 'react';
import {Row, Col, message, Select} from 'antd';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import AButton from './../../Common/Components/Input/AButton';
import axios from "axios";
import {SALES_API_URL, CUSTOMER_API_URL} from "./constants";
import {throwServerError} from "../../Common/utiles/throwServerError";
import useFetch from "../../Common/hooks/useFetch";
import ASelect from "../../Common/Components/Input/ASelect";

const { Option } = Select;

const CartForm = props => {
    const {
        setSelectedProductList,
        refreshList,
        selectedProductList,
    } = props;
    const params = {
        customer: '',
    };
    const { data: customers } = useFetch(CUSTOMER_API_URL, { config: { params: {} }});

    return (
        <Formik
            initialValues={{...params}}
            validationSchema={Yup.object({
                customer: Yup.string().required('Required'),
            })}
            enableReinitialize
            onSubmit={async (values, {resetForm}) => {
                const saleItemList = selectedProductList.map(item => {
                    return {
                      product: item.product._id,
                      quantity: item.count,
                    };
                });
                    try{
                        await axios.post(SALES_API_URL, {...values, sale_items: saleItemList});
                        await setSelectedProductList([]);
                        await resetForm();
                        await refreshList();
                        message.success('Sale Processed Successfully!');
                    }catch (e){
                        throwServerError(e)
                    }
            }}
        >
            {({ isSubmitting, dirty }) => (<Form>
                <Row gutter={20} style={{ marginTop: 63}}>
                    <Col md={24}>
                        <Field
                            component={ASelect}
                            showSearch
                            filterOption={true}
                            placeholder="Customer"
                            name="customer"
                        >
                            {customers.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)}
                        </Field>
                    </Col>
                </Row>
                        {selectedProductList.map(item => {
                            return (
                                 <Row>
                                     <Col span={12}>{item.product.title}</Col>
                                     <Col span={6}>{item.count}</Col>
                                 </Row>
                            )
                        })}
                <Row style={{ marginTop: 30}}>
                    <Col span={24}>
                        <AButton
                            disabled={!dirty || !selectedProductList.length > 0}
                            type="primary"
                            htmlType="submit"
                            loading={isSubmitting}
                        >
                            Make Sale
                        </AButton>
                    </Col>
                </Row>
            </Form>)}
        </Formik>
    );
};

export default CartForm;