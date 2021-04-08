import React, { useState, useRef, useCallback } from "react";
import getSnappables from "../../firebase/users/GetSnappables";
import { snappablesToCsvDownload, readFileAndUpload } from "./csvManager";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

const SnappableManager = () => {
    const [status, setStatus] = useState({ status: IDLE });
    const fileRef = useRef(null);

    const downloadSnappables = useCallback(() => {
        setStatus({ status: LOADING });
        (async () => {
            try {
                const snappables = await getSnappables();
                snappablesToCsvDownload(snappables);
                setStatus({ status: IDLE });
            } catch {
                setStatus({
                    status: ERROR,
                    error: "There was an error loading snappable people.",
                });
            }
        })();
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
                    disabled={status.status === LOADING}
                >
                    Download as CSV
                </button>
                <input
                    type="file"
                    ref={fileRef}
                    onChange={uploadSnappables}
                    disabled={status.status === LOADING}
                    accept=".csv"
                />
            </div>
            {status.status !== IDLE && (
                <p>
                    {status.status === ERROR ? (
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
