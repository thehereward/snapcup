import React, { useEffect, useState } from "react";
import { streamAllSnappablePeople } from "../../../firebase/users/GetSnappables";
import Snappable from "../../../types/Snappable";
import SnappableRow from "./SnappablesRow";
import { Entity } from "../../../types/Entity";
import Snap from "../../../types/Snap";

const SnappablesTable = (props: { currentSnaps?: Entity<Snap>[] }) => {
    const [snappables, setSnappables] = useState<Snappable[]>([]);

    const numSnapsForUser = (id: string) => {
        if (!props.currentSnaps) {
            return 0;
        }
        return props.currentSnaps.filter((snap) => {
            snap.to.includes(id);
        }).length;
    };

    const rows = snappables
        .sort((a: Snappable, b: Snappable) =>
            a.fullName.localeCompare(b.fullName)
        )
        .map((p: Snappable) => (
            <SnappableRow snappable={p} numSnaps={numSnapsForUser(p.id)} />
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
                    <th scope="col">Snaps Recieved</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    );
};

export default SnappablesTable;
