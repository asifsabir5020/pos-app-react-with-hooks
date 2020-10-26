import React from "react";
import { Button } from "antd";

const AButton = props => {
    return (
        <Button {...props}>
            {props.children}
        </Button>
    );
}
export default AButton;