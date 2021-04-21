import React from "react";
import { Entity, Snap, Snappable } from "../../../types";
import SnappableRow from "./SnappablesRow";
import { countSnapsForUser } from "./CountSnapsForUser";

const SnappablesTable = (props: {
    snappables: Entity<Snappable>[];
    currentSnaps?: Entity<Snap>[];
}) => {
    const rows = props.snappables
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

    return (
        <table className="table  table-hover">
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
