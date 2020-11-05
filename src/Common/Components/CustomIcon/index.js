import React from "react";
import { Tooltip } from "antd";
import {
    DeleteOutlined,
    FormOutlined,
    BarChartOutlined,
    TeamOutlined,
    BarcodeOutlined,
    BorderOutlined,
    KeyOutlined,
    UserOutlined,
    ImportOutlined,
    ExportOutlined,
    BankOutlined,
} from '@ant-design/icons';

const CustomIcon = props => {
    const type = props.type || 'border';
    const IconComponents = {
        delete: { component: DeleteOutlined, style: { color: 'red'}},
        edit: { component: FormOutlined, style: {}},
        barChart: { component: BarChartOutlined, style: {}},
        team: { component: TeamOutlined, style: {}},
        barcode: { component: BarcodeOutlined, style: {}},
        border: { component: BorderOutlined, style: {}},
        permissions: { component: KeyOutlined, style: {}},
        user: { component: UserOutlined, style: {}},
        import: { component: ImportOutlined, style: {}},
        export: { component: ExportOutlined, style: {}},
        bank: { component: BankOutlined, style: {}},
    };
    let IconComponent = IconComponents[type].component;
    let componentStyle = IconComponents[type].style;
    return (<>
            {props.title &&
            (<Tooltip title={props.title}>
                <IconComponent
                    onClick={props.onClick}
                    style={{ ...componentStyle, marginLeft: 5, marginRight: 5 }}
                />
            </Tooltip>
            ) || (
                <IconComponent
                    onClick={props.onClick}
                    style={{ ...componentStyle, marginLeft: 5, marginRight: 5 }}
                />
            )}
        </>
    );
}
export default CustomIcon;