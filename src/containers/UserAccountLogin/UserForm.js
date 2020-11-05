import React  from 'react';
import {Row, Col, message, Select} from 'antd';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import AInput from "./../../Common/Components/Input/AInput";
import AButton from './../../Common/Components/Input/AButton';
import axios from "axios";
import {USER_REGISTER_API_URL, USER_ROLE_LIST} from "./constants";
import {throwServerError} from "../../Common/utiles/throwServerError";
import ASelect from "../../Common/Components/Input/ASelect";

const { Option } = Select;

const UserForm = props => {
    const { selectedRecord, isEditMode, setShouldShowModal, setSelectedRecord, refreshList } = props;
    const params = {
        name: selectedRecord.name || '',
        email: selectedRecord.email || '',
        password: '',
        role: selectedRecord.role || '',
    };

    return (
        <Formik
            initialValues={{...params}}
            validationSchema={Yup.object({
                name: Yup.string().required('Required'),
                email: isEditMode ? Yup.string() : Yup.string().required('Required'),
                password: isEditMode ? Yup.string() : Yup.string().required('Required'),
                confirm_password: isEditMode ? Yup.string() : Yup.string().required('Required'),
                role: Yup.string().required('Required'),
            })}
            enableReinitialize
            onSubmit={async (values, {resetForm}) => {
                if(isEditMode){
                    try{
                        await axios.put(`${USER_REGISTER_API_URL}/${selectedRecord._id}`, {
                            ...values
                        });
                        await refreshList();
                        await setShouldShowModal(false);
                        await setSelectedRecord({});
                        await resetForm();
                        message.success('User Updated Successfully!');
                    }catch (e){
                        throwServerError(e)
                    }
                }else{
                    try{
                        await axios.post(USER_REGISTER_API_URL, {
                            ...values
                        });
                        await refreshList();
                        await setShouldShowModal(false);
                        await setSelectedRecord({});
                        await resetForm();
                        message.success('User Created Successfully!');
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
                            name="name"
                            component={AInput}
                            placeholder="User Name"
                        />
                    </Col>
                    <Col md={12}>
                        <Field
                            disabled={isEditMode}
                            name="email"
                            component={AInput}
                            placeholder="User Email"
                        />
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col md={12}>
                        <Field
                            disabled={isEditMode}
                            type="password"
                            name="password"
                            component={AInput}
                            placeholder="User Password"
                        />
                    </Col>
                    <Col md={12}>
                        <Field
                            disabled={isEditMode}
                            type="password"
                            name="confirm_password"
                            component={AInput}
                            placeholder="Confirm Password"
                        />
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col md={12}>
                        <Field
                            component={ASelect}
                            placeholder="User Role"
                            name="role"
                        >
                            {USER_ROLE_LIST.map(item => <Option key={item.value} value={item.value}>{item.title}</Option>)}
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

export default UserForm;