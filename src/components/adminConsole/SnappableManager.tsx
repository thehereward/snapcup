import React, { useState, useEffect, useCallback } from "react";
import GetSnappables from "../../firebase/users/GetSnappables";
import snappablesToCsvDownload from "./csvManager";

const SnappableRows = ({ snappables }) =>
    snappables.map(({ id, fullName, email, username }, i) => (
        <tr key={id}>
            <th scope="row">{i + 1}</th>
            <td>{fullName}</td>
            <td>{email}</td>
            <td>{username}</td>
        </tr>
    ));

const SnappableManager = () => {
    const [status, setStatus] = useState({ status: "idle" });

    const downloadSnappables = useCallback(() => {
        setStatus({ status: "loading" });
        GetSnappables()
            .then((snappables) => {
                snappablesToCsvDownload(snappables);
                setStatus({ status: "idle" });
            })
            .catch(() => {
                setStatus({
                    status: "error",
                    error: "There was an error loading snappable people.",
                });
            });
    }, []);

    const uploadSnappables = useCallback(() => {
        console.log(this);
    });

    return (
        <>
            <h5>Snappable People</h5>
            <div
                className="btn-group ml-2"
                role="group"
                aria-label="Buttons for manipulating data"
            >
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => downloadSnappables()}
                    disabled={status.status === "Loading"}
                >
                    Download as CSV
                </button>
                <input
                    type="file"
                    onChange={useCallback}
                    disabled={status.status === "Loading"}
                />
            </div>
            {status.status !== "idle" && (
                <p>
                    {status.status === "error" ? (
                        <span className="text-danger">{status.error}</span>
                    ) : (
                        <b>Loading...</b>
                    )}
                </p>
            )}
        </>
    );
};

export default SnappableManager;
