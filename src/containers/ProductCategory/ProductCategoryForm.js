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
    return (
        <Formik
            initialValues={{ title: '' }}
            validationSchema={Yup.object({
                title: Yup.string().required('Required'),
            })}
            onSubmit={async (values, { setSubmitting }) => {
                try{
                    const response = await axios.post(PRODUCT_CATEGORY_API_URL, {
                        ...values
                    });
                }catch (e){
                    throwServerError(e)
                }
            }}
        >
            {({ values }) => (<Form>
                <Row gutter={10}>
                    <Col md={20}>
                        <Field
                            name="title"
                            component={AInput}
                            placeholder="Title"
                        />
                    </Col>
                </Row>
                <AButton type="primary" htmlType="submit">Save</AButton>
            </Form>)}
        </Formik>
    );
};

export default ProductCategoryForm;