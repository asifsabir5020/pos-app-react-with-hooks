import React from 'react';
import {Row, Col, message} from 'antd';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import AInput from "./../../Common/Components/Input/AInput";
import AButton from './../../Common/Components/Input/AButton';
import axios from "axios";
import {VENDOR_API_URL} from "./constants";
import {throwServerError} from "../../Common/utiles/throwServerError";

const VendorForm = props => {
    const { selectedRecord, isEditMode, setShouldShowModal, setSelectedRecord, refreshList } = props;
    const params = {
        name: selectedRecord.name || '',
        contact: selectedRecord.contact || '',
    };

    return (
        <Formik
            initialValues={{...params}}
            validationSchema={Yup.object({
                name: Yup.string().required('Required'),
                contact: Yup.string().required('Required'),
            })}
            enableReinitialize
            onSubmit={async (values, {resetForm}) => {
                if(isEditMode){
                    try{
                        await axios.put(`${VENDOR_API_URL}/${selectedRecord._id}`, {
                            ...values
                        });
                        await refreshList();
                        await setShouldShowModal(false);
                        await setSelectedRecord({});
                        await resetForm();
                        message.success('Vendor Updated Successfully!');
                    }catch (e){
                        throwServerError(e)
                    }
                }else{
                    try{
                        await axios.post(VENDOR_API_URL, {
                            ...values
                        });
                        await refreshList();
                        await setShouldShowModal(false);
                        await setSelectedRecord({});
                        await resetForm();
                        message.success('Vendor Created Successfully!');
                    }catch (e){
                        throwServerError(e)
                    }
                }
            }}
        >
            {({ isSubmitting, dirty }) => (<Form>
                <Row gutter={10}>
                    <Col md={12}>
                        <Field
                            name="name"
                            component={AInput}
                            placeholder="Name"
                        />
                    </Col>
                    <Col md={12}>
                        <Field
                            name="contact"
                            component={AInput}
                            placeholder="Contact No"
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

export default VendorForm;