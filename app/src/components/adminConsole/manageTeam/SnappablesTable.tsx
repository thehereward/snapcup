import React, { useEffect, useState } from "react";
import { streamAllSnappablePeople } from "../../../firebase/users/GetSnappables";
import Snappable from "../../../types/Snappable";
import SnappableRow from "./SnappablesRow";
import { Entity } from "../../../types/Entity";
import Snap from "../../../types/Snap";
import { countSnapsForUser } from "./CountSnapsForUser";

const SnappablesTable = (props: { currentSnaps?: Entity<Snap>[] }) => {
    const [snappables, setSnappables] = useState<Snappable[]>([]);

    const rows = snappables
        .sort((a: Snappable, b: Snappable) =>
            a.fullName.localeCompare(b.fullName)
        )
        .map((p: Snappable) => (
            <SnappableRow
                key={p.id}
                snappable={p}
                numSnaps={countSnapsForUser(p.id, props.currentSnaps)}
            />
        ));

    useEffect(() => {
        const unsubscribe = streamAllSnappablePeople(
            (people) => setSnappables(people),
            (error) => console.error(error)
        );
        // clean up function
        return unsubscribe;
    }, [setSnappables]);

    return (
        <table className="table table-light">
            <thead>
                <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Full Name</th>
                    <th scope="col">Username</th>
                    <th scope="col">Snaps Received</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
};

export default SnappablesTable;
