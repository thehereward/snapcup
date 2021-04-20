import React from "react";
import { Snappable } from "../../../types";

const SnappableRow: React.FunctionalComponent = (props: {
    snappable: Snappable;
    numSnaps: number;
}) => {
    return (
        <tr>
            <td>{props.snappable.email}</td>
            <td>{props.snappable.fullName}</td>
            <td>{props.snappable.username}</td>
            <td>{props.numSnaps}</td>
        </tr>
    );
};

export default SnappableRow;
