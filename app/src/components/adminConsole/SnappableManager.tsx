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
        if (fileRef.current.files.length) {
            (async () => {
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
            })();
        } else {
            setStatus({
                status: ERROR,
                error: "You don't have a file to upload.",
            });
        }
    });

    return (
        <>
            <h5>Snappable People</h5>
            <p>
                When uploading the list of snappable people please leave the ID
                cell blank for new users. Leaving the ID column blank tells the
                database that this is a new user and not an existing user to
                update.
            </p>
            <p>
                Also be aware that using the upload list of users feature sets
                the list of users to *exactly* match those in your CSV file.
                This means that if you omit a user from the list that you
                upload, they will be deleted. For this reason it is recommended
                to download the list of users, make edits to it, then reupload
                it.
            </p>
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
                    value="Upload complete list of users."
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
