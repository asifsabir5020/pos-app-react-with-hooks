import React  from 'react';
import {Row, Col, message, Select} from 'antd';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import AInput from "./../../Common/Components/Input/AInput";
import AButton from './../../Common/Components/Input/AButton';
import axios from "axios";
import {PURCHASE_API_URL, VENDOR_API_URL, PRODUCT_API_URL} from "./constants";
import {throwServerError} from "../../Common/utiles/throwServerError";
import useFetch from "../../Common/hooks/useFetch";
import ASelect from "../../Common/Components/Input/ASelect";

const { Option } = Select;

const PurchaseForm = props => {
    const { selectedRecord, isEditMode, setShouldShowModal, setSelectedRecord, refreshList } = props;

    const params = {
        product: selectedRecord.product && selectedRecord.product._id || '',
        vendor: selectedRecord.vendor && selectedRecord.vendor._id || '',
        quantity: selectedRecord.quantity || '',
    };
    const { data: vendors } = useFetch(VENDOR_API_URL, { config: { params: {} }});
    const { data: products } = useFetch(PRODUCT_API_URL, { config: { params: {} }});
    return (
        <Formik
            initialValues={{...params}}
            validationSchema={Yup.object({
                product: Yup.string().required('Required'),
                vendor: Yup.string().required('Required'),
                quantity: Yup.number().required('Required'),
            })}
            enableReinitialize
            onSubmit={async (values, {resetForm}) => {
                if(isEditMode){
                    try{
                        await axios.put(`${PURCHASE_API_URL}/${selectedRecord._id}`, {
                            ...values
                        });
                        await refreshList();
                        await setShouldShowModal(false);
                        await setSelectedRecord({});
                        await resetForm();
                        message.success('Product Updated Successfully!');
                    }catch (e){
                        throwServerError(e)
                    }
                }else{
                    try{
                        await axios.post(PURCHASE_API_URL, {
                            ...values
                        });
                        await refreshList();
                        await setShouldShowModal(false);
                        await setSelectedRecord({});
                        await resetForm();
                        message.success('Product Created Successfully!');
                    }catch (e){
                        throwServerError(e)
                    }
                }
            }}
        >
            {({ isSubmitting, dirty }) => (<Form>
                <Row gutter={20}>
                    <Col md={24}>
                        <Field
                            component={ASelect}
                            showSearch
                            filterOption={true}
                            placeholder="Product"
                            name="product"
                        >
                            {products.map(item => <Option key={item._id} value={item._id}>{item.title}</Option>)}
                        </Field>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col md={24}>
                        <Field
                            component={ASelect}
                            showSearch
                            filterOption={true}
                            placeholder="Vendor"
                            name="vendor"
                        >
                            {vendors.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)}
                        </Field>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col md={24}>
                        <Field
                            name="quantity"
                            component={AInput}
                            placeholder="Quantity"
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AButton
                            disabled={!dirty}
                            type="primary"
                            htmlType="submit"
                            loading={isSubmitting}
                            style={{ float: 'right'}}
                        >
                            {isEditMode ? 'Save Changes':'Create'}
                        </AButton>
                    </Col>
                </Row>
            </Form>)}
        </Formik>
    );
};

export default PurchaseForm;