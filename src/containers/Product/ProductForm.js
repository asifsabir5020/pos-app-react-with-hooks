import React  from 'react';
import {Row, Col, message, Select} from 'antd';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import AInput from "./../../Common/Components/Input/AInput";
import AButton from './../../Common/Components/Input/AButton';
import axios from "axios";
import {PRODUCT_API_URL, PRODUCT_CATEGORY_API_URL} from "./constants";
import {throwServerError} from "../../Common/utiles/throwServerError";
import useFetch from "../../Common/hooks/useFetch";
import ASelect from "../../Common/Components/Input/ASelect";

const { Option } = Select;

const ProductForm = props => {
    const { selectedRecord, isEditMode, setShouldShowModal, setSelectedRecord, refreshList } = props;
    const params = {
        title: selectedRecord.title || '',
        category: selectedRecord.category && selectedRecord.category._id || '',
    };
    const { data: productCategories } = useFetch(PRODUCT_CATEGORY_API_URL, { config: { params: {} }});
    return (
        <Formik
            initialValues={{...params}}
            validationSchema={Yup.object({
                title: Yup.string().required('Required'),
                category: Yup.string().required('Required'),
            })}
            enableReinitialize
            onSubmit={async (values, {resetForm}) => {
                if(isEditMode){
                    try{
                        await axios.put(`${PRODUCT_API_URL}/${selectedRecord._id}`, {
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
                        await axios.post(PRODUCT_API_URL, {
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
                    <Col md={12}>
                        <Field
                            name="title"
                            component={AInput}
                            placeholder="Title"
                        />
                    </Col>
                    <Col md={12}>
                        <Field
                            component={ASelect}
                            showSearch
                            filterOption={true}
                            placeholder="Product Category"
                            name="category"
                        >
                            {productCategories.map(item => <Option key={item._id} value={item._id}>{item.title}</Option>)}
                        </Field>
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

export default ProductForm;