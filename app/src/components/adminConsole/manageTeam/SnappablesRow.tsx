import React, { useEffect, useState } from "react";
import Snappable from "../../../types/Snappable";
import { streamNumberOfSnapsForSnappable } from "../../../firebase/snaps/SnapService";

const SnappableRow = (props: { snappable: Snappable }) => {
    const [numSnaps, setNumSnaps] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = streamNumberOfSnapsForSnappable(
            (num) => setNumSnaps(num),
            (error) => setError(error.message),
            props.snappable.id
        );
        // clean up function
        return unsubscribe;
    }, [setNumSnaps, setError]);

    return (
        <tr key={props.snappable.id}>
            <td>{props.snappable.email}</td>
            <td>{props.snappable.fullName}</td>
            <td>{props.snappable.username}</td>
            <td>{error ? `Error: ${error}` : numSnaps}</td>
        </tr>
    );
};

export default SnappableRow;
