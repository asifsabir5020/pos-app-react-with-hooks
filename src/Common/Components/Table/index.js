import React from "react";
import { Table as ATable } from "antd";

const Table = props => {
    return (
        <ATable {...props} showSorterTooltip={false}>
            {props.children}
        </ATable>
    );
}
export default Table;