import React from 'react';
import {Row, Col, message} from 'antd';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import AInput from "./../../Common/Components/Input/AInput";
import AButton from './../../Common/Components/Input/AButton';
import axios from "axios";
import {STOCK_API_URL} from "./constants";
import {throwServerError} from "../../Common/utiles/throwServerError";

const ProductCategoryForm = props => {
    const { selectedRecord, isEditMode, setShouldShowModal, setSelectedRecord, refreshList } = props;
    const params = {
        title: selectedRecord.title || '',
    };

    return (
        <Formik
            initialValues={{...params}}
            validationSchema={Yup.object({
                title: Yup.string().required('Required'),
            })}
            enableReinitialize
            onSubmit={async (values, {resetForm}) => {
                if(isEditMode){
                    try{
                        await axios.put(`${STOCK_API_URL}/${selectedRecord._id}`, {
                            ...values
                        });
                        await refreshList();
                        await setShouldShowModal(false);
                        await setSelectedRecord({});
                        await resetForm();
                        message.success('Product Category Updated Successfully!');
                    }catch (e){
                        throwServerError(e)
                    }
                }else{
                    try{
                        await axios.post(STOCK_API_URL, {
                            ...values
                        });
                        await refreshList();
                        await setShouldShowModal(false);
                        await setSelectedRecord({});
                        await resetForm();
                        message.success('Product Category Created Successfully!');
                    }catch (e){
                        throwServerError(e)
                    }
                }
            }}
        >
            {({ isSubmitting, dirty }) => (<Form>
                <Row gutter={10}>
                    <Col md={24}>
                        <Field
                            name="title"
                            component={AInput}
                            placeholder="Title"
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

export default ProductCategoryForm;