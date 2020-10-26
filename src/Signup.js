import React from 'react';
import {Row, Col, Select} from 'antd';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import AInput from "./Common/Components/Input/AInput";
import ASelect from './Common/Components/Input/ASelect';
import AButton from './Common/Components/Input/AButton';

const { Option } = Select;

const SignupForm = () => {
    return (
        <Formik
            initialValues={{ name: '', city: '' }}
            validationSchema={Yup.object({
                name: Yup.string()
                    .max(5, 'Must be 5 characters or less')
                    .required('Required'),
                city: Yup.string().required('Required'),
            })}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({ values }) => (<Form>
                <Row gutter={10}>
                    <Col md={4}>
                        <Field
                            name="name"
                            component={AInput}
                            placeholder="User Name"
                        />
                    </Col>
                    <Col md={4}>
                        <Field
                            component={ASelect}
                            showSearch
                            filterOption={true}
                            placeholder="City"
                            name="city"
                        >
                            <Option value="lucy">Lucy</Option>
                            <Option value="ok">ok</Option>
                        </Field>
                    </Col>
                </Row>
                <AButton type="primary" htmlType="submit">Save</AButton>
            </Form>)}
        </Formik>
    );
};

export default SignupForm;