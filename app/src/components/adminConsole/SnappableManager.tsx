import React, { useState, useRef, useCallback } from "react";
import GetSnappables from "../../firebase/users/GetSnappables";
import { snappablesToCsvDownload, readFileAndUpload } from "./csvManager";

const SnappableManager = () => {
    const [status, setStatus] = useState({ status: "idle" });
    const fileRef = useRef(null);

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
        if (fileRef.current.files.length) {
            readFileAndUpload(fileRef.current.files[0]);
        }
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
                    ref={fileRef}
                    onChange={uploadSnappables}
                    disabled={status.status === "Loading"}
                    accept=".csv"
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
