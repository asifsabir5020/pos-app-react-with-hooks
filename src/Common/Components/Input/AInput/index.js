import React from "react";
import { Form, Input } from "antd";

const AInput = props => {
    const {field:{ name, value}, form:{errors, setFieldValue}, type} = props;
    return (
        <Form.Item
            hasFeedback={!!errors[name]}
            validateStatus={errors[name] && "error"}                                                                                    
            help={errors[name]}
        >
            <Input
                placeholder={props.placeholder}
                value={value}
                onChange={e => setFieldValue(name, e.target.value.trim())}
                type={type}
                // onBlur={() => setFieldTouched(name)}
                // onPressEnter={handleSubmit}
            />
        </Form.Item>
    );
}

export default AInput;