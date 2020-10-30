import React from 'react';
import {Row, Col, message} from 'antd';
import axios from "axios";
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import AInput from "./../../../Common/Components/Input/AInput";
import AButton from "./../../../Common/Components/Input/AButton";
import {LOGIN_API_URL} from "./constants";
import {throwServerError} from "../../../Common/utiles/throwServerError";
import {landingRoute, setTokenAndUser} from "../utils";

const LoginForm = props => {
    const history = useHistory();
    const params = {
        email:  'admin@admin.com',
        password:  'admin123',
    };

    return (
        <div style={{ paddingTop: '25%', paddingRight: 50}}>
        <Formik
            initialValues={{...params}}
            validationSchema={Yup.object({
                email: Yup.string().email().required('Required'),
                password: Yup.string().required('Required'),
            })}
            enableReinitialize
            onSubmit={async (values, {resetForm}) => {
                    try{
                        const response = await axios.post(LOGIN_API_URL, {
                            ...values
                        });
                        const {token, user} = response.data;
                        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
                        await setTokenAndUser(token, user);
                        await resetForm();
                        await history.push(landingRoute(user));
                        message.success('Successfully Logged in!');
                    }catch (e){
                        throwServerError(e)
                    }
            }}
        >
            {({ values, isSubmitting, dirty }) => (<Form>
                <Row gutter={10}>
                    <Col span={6} offset={18}>
                        <Field
                            name="email"
                            component={AInput}
                            placeholder="User Email"
                        />
                        <Field
                            type="password"
                            name="password"
                            component={AInput}
                            placeholder="User Password"
                        />
                <AButton
                    // disabled={!dirty}
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                >
                    Login
                </AButton>
                </Col>
            </Row>
            </Form>)}
        </Formik>
    </div>
    );
};

export default LoginForm;