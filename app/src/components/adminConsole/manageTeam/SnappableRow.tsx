import React from "react";
import { CustomRow } from "./extensionTypes";

interface Props {
    rowInstance: CustomRow;
}

const SnappableRow = ({ rowInstance }: Props) => {
    return (
        <tr {...rowInstance.getRowProps()}>
            {rowInstance.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
            })}
        </tr>
    );
};

export default SnappableRow;
