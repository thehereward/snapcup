import React, { useEffect, useState } from "react";
import { streamAllSnappablePeople } from "../../../firebase/users/GetSnappables";
import Snappable from "../../../types/Snappable";

const SnappablesTable = () => {
    const [snappables, setSnappables] = useState<Snappable[]>([]);

    const rows = snappables.map((p: Snappable) => (
        <tr key={p.id}>
            <td>{p.email}</td>
            <td>{p.fullName}</td>
            <td>{p.username}</td>
            <td>2</td>
        </tr>
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
