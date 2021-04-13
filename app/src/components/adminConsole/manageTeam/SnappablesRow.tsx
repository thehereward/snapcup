import React from "react";
import Snappable from "../../../types/Snappable";

const SnappableRow = (props: { snappable: Snappable; numSnaps: number }) => {
    return (
        <tr key={props.snappable.id}>
            <td>{props.snappable.email}</td>
            <td>{props.snappable.fullName}</td>
            <td>{props.snappable.username}</td>
            <td>{props.numSnaps}</td>
        </tr>
    );
};

export default SnappableRow;
