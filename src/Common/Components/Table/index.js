import React from "react";
import {Col, Row, Table as ATable} from "antd";

const Table = props => {
    const rowKey = props.rowKey ? props.rowKey: '_id';
    const customToolbar = props.customToolbar;
    const customeSearchRender = props.customeSearchRender;
    return (
        <>
            <Row style={{ marginBottom: 20}}>
                <Col span={4}>
                    {customeSearchRender && customeSearchRender()}
                </Col>
                <Col span={16} offset={4}>
                    <div style={{ float: 'right'}}>
                        {customToolbar && customToolbar()}
                    </div>
                </Col>
            </Row>
            <ATable
                {...props}
                rowKey={rowKey}
                pagination={{position: ["bottomLeft"], pageSize: 10}}
                size="small"
            />
        </>
    );
}
export default Table;