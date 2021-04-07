import React, { useState, useEffect, useCallback } from "react";
import GetSnappables from "../../firebase/users/GetSnappables";
import snappablesToCsvDownload from "./snappablesToCsvDownload";

const SnappableRows = ({ snappables }) =>
    snappables.map(({ id, fullName, email, username }, i) => (
        <tr key={id}>
            <th scope="row">{i + 1}</th>
            <td>{fullName}</td>
            <td>{email}</td>
            <td>{username}</td>
        </tr>
    ));

const SnappableTable = () => {
    const [status, setStatus] = useState({ status: "Loading..." });
    const [snappables, setSnappables] = useState([]);

    const reloadSnappables = useCallback(() => {
        setStatus({ status: "Loading..." });
        GetSnappables()
            .then((snappables) => {
                setSnappables(snappables);
                setStatus({ status: "success" });
            })
            .catch(() => {
                setStatus({
                    status: "error",
                    error: "There was an error loading snappable people.",
                });
            });
    }, []);

    useEffect(reloadSnappables, [reloadSnappables]);

    return (
        <>
            <h3>
                Snappable People
                <div
                    class="btn-group ml-2"
                    role="group"
                    aria-label="Buttons for manipulating data"
                >
                    <button
                        type="button"
                        class="btn btn-secondary"
                        disabled={status.status === "loading"}
                        onClick={() => reloadSnappables()}
                    >
                        Refresh
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        onClick={() => snappablesToCsvDownload(snappables)}
                        disabled={snappables.length === 0}
                    >
                        Download as CSV
                    </button>
                </div>
            </h3>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Username</th>
                    </tr>
                </thead>
                <tbody>
                    {status.status !== "success" && (
                        <tr>
                            <td colSpan={4}>
                                {status.status === "error" ? (
                                    <span className="text-danger">
                                        {status.error}
                                    </span>
                                ) : (
                                    "Loading..."
                                )}
                            </td>
                        </tr>
                    )}
                    {snappables.length > 0 && (
                        <SnappableRows snappables={snappables} />
                    )}
                </tbody>
            </table>
        </>
    );
};

export default SnappableTable;
