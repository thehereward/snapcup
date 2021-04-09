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
            } catch (err) {
                console.error(err);
                setStatus({
                    status: ERROR,
                    error: "There was an error loading snappable people.",
                });
            }
        })();
    }, []);

    const uploadSnappables = useCallback((event) => {
        event.preventDefault();
        (async () => {
            if (fileRef.current.files.length) {
                setStatus({ status: LOADING });
                try {
                    await readFileAndUpload(fileRef.current.files[0]);
                    setStatus({ status: IDLE });
                    fileRef.current.value = "";
                } catch (err) {
                    console.error(err);
                    setStatus({
                        status: ERROR,
                        error:
                            "There was an error uploading your list of people.",
                    });
                }
            }
        })();
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
            </div>
            <form onSubmit={uploadSnappables}>
                <input
                    type="file"
                    ref={fileRef}
                    disabled={status.status === LOADING}
                    accept=".csv"
                />
                <input
                    type="submit"
                    className="btn btn-purple"
                    value="Submit"
                />
            </form>
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
