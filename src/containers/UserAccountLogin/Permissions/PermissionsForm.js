import React, {useEffect, useState} from 'react';
import {Row, Col, message} from 'antd';
import { Formik, Field, Form } from 'formik';
import AButton from './../../../Common/Components/Input/AButton';
import axios from "axios";
import {PERMISSIONS_API_URL} from "./constants";
import {throwServerError} from "../../../Common/utiles/throwServerError";
import ACheckbox from "../../../Common/Components/Input/ACheckbox";

const PermissionsForm = props => {
    const { selectedRecord, setShouldShowPermissionsModal, setSelectedRecord } = props;
    const [userPermissions, setUserPermissions] = useState({});

    useEffect(() => {
        (async () =>{
            try{
                const response = await axios.get(`${PERMISSIONS_API_URL}/${selectedRecord._id}`);
                setUserPermissions(response.data);
            }catch(error){
                throwServerError(error);
            }
        })();
    }, []);

    const params = {
        display_dashboard: userPermissions.display_dashboard || false,
        display_sales: userPermissions.display_sales || false,
        display_product: userPermissions.display_product || false,
        display_product_category: userPermissions.display_product_category || false,
        display_user_account: userPermissions.display_user_account || false,
    };

    return (
        <Formik
            initialValues={{...params}}
            enableReinitialize
            onSubmit={async (values) => {
                try{
                    if(Object.keys(userPermissions).length) {
                        await axios.put(`${PERMISSIONS_API_URL}/${userPermissions._id}`, {
                            ...values
                        });
                        await setShouldShowPermissionsModal(false);
                        await setSelectedRecord({});
                        message.success('User Permissions updated Successfully!');
                    }
                }catch (e){
                    throwServerError(e)
                }
            }}
        >
            {({ isSubmitting, dirty }) => (<Form>
                <Row gutter={20}>
                    <Col md={6}>
                        <Field
                            name="display_dashboard"
                            component={ACheckbox}
                            label="Dashboard"
                        />
                    </Col>
                    <Col md={6}>
                        <Field
                            name="display_sales"
                            component={ACheckbox}
                            label="Sales"
                        />
                    </Col>
                    <Col md={6}>
                        <Field
                            name="display_product"
                            component={ACheckbox}
                            label="Product"
                        />
                    </Col>
                    <Col md={6}>
                        <Field
                            name="display_product_category"
                            component={ACheckbox}
                            label="Product Category"
                        />
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col md={6}>
                        <Field
                            name="display_user_account"
                            component={ACheckbox}
                            label="User Account"
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
                            Save Changes
                        </AButton>
                    </Col>
                </Row>
            </Form>)}
        </Formik>
    );
};

export default PermissionsForm;