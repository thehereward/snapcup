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
            <div className="center-aligned overflow-break-word">
                {columnInstance.render("Header")}
                <span>
                    {columnInstance.isSorted
                        ? columnInstance.isSortedDesc
                            ? " ▾"
                            : " ▴"
                        : ""}
                </span>
            </div>
        </th>
    );
};

export default SnappableHeader;
