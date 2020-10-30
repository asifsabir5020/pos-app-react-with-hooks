import React from "react";
import { Form, Select } from "antd";

const ASelect = props => {
    const {field:{ name, value }, form:{errors, setFieldValue }} = props;
    return (
        <Form.Item
            hasFeedback={!!errors[name]}
            validateStatus={errors[name] && "error"}
            help={errors[name]}
        >
            <Select
                {...props}
                value={value}
                placeholder={props.placeholder}
                showArrow
                onChange={v => setFieldValue(name, v)}
            >
                {props.children}
            </Select>
        </Form.Item>
    );
}

export default ASelect;