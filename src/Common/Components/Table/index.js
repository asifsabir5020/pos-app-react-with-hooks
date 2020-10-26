import React from "react";
import { Table as ATable } from "antd";

const Table = props => {
    return (
        <ATable {...props}>
            {props.children}
        </ATable>
    );
}
export default Table;