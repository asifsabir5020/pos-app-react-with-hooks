import React from "react";
import { Form, Checkbox } from "antd";

const ACheckbox = props => {
    const {field:{ name, value}, form:{errors, setFieldValue}} = props;
    return (
        <Form.Item
            hasFeedback={!!errors[name]}
            validateStatus={errors[name] && "error"}
            help={errors[name]}
        >
            <Checkbox
                {...props}
                onChange={e => setFieldValue(name, e.target.checked)}
                checked={value}
            >
                {props.label}
            </Checkbox>
        </Form.Item>
    );
}

export default ACheckbox;