import React from 'react';
import {Row, Col} from 'antd';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import AInput from "./../../Common/Components/Input/AInput";
import AButton from './../../Common/Components/Input/AButton';
import axios from "axios";
import {PRODUCT_CATEGORY_API_URL} from "./constants";
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
            onSubmit={async values => {
                if(isEditMode){
                    try{
                        await axios.put(`${PRODUCT_CATEGORY_API_URL}/${selectedRecord._id}`, {
                            ...values
                        });
                        refreshList();
                        setShouldShowModal(false);
                        setSelectedRecord({});
                    }catch (e){
                        throwServerError(e)
                    }
                }else{
                    try{
                        await axios.post(PRODUCT_CATEGORY_API_URL, {
                            ...values
                        });
                        refreshList();
                        setShouldShowModal(false);
                        setSelectedRecord({});
                    }catch (e){
                        throwServerError(e)
                    }
                }
            }}
        >
            {({ values, isSubmitting, dirty }) => (<Form>
                <Row gutter={10}>
                    <Col md={20}>
                        <Field
                            name="title"
                            component={AInput}
                            placeholder="Title"
                        />
                    </Col>
                </Row>
                <AButton
                    disabled={!dirty}
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                >
                    {isEditMode ? 'Save Changes':'Create'}
                </AButton>
            </Form>)}
        </Formik>
    );
};

export default ProductCategoryForm;