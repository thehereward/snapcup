import React from "react";
import { CustomColumn } from "./extensionTypes";

interface Props {
    columnInstance: CustomColumn;
}

const SnappableHeader = ({ columnInstance }: Props) => {
    return (
        <th
            {...columnInstance.getHeaderProps(
                columnInstance.getSortByToggleProps()
            )}
            scope="col"
        >
            <div>{columnInstance.render("Header")}</div>
            <span>
                {columnInstance.isSorted
                    ? columnInstance.isSortedDesc
                        ? " ▾"
                        : " ▴"
                    : ""}
            </span>
        </th>
    );
};

export default SnappableHeader;
