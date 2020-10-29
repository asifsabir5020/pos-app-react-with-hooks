import React from "react";
import {DeleteOutlined, FormOutlined} from '@ant-design/icons';

const ActionIcon = props => {
    const type = props.type;
    const IconComponents = {
        delete: { component: DeleteOutlined, style: { color: 'red'}},
        edit: { component: FormOutlined, style: {}},
    };
    let IconComponent = IconComponents[type].component;
    let componentStyle = IconComponents[type].style;
    return (
        <IconComponent onClick={props.onClick} style={{ ...componentStyle }}/>
    );
}
export default ActionIcon;