import React, { useState, useRef, useCallback } from "react";
import getSnappables from "../../firebase/users/GetSnappables";
import { FileUploadWrapper } from "./AdminConsoleStyles";
import { snappablesToCsvDownload, readFileAndUpload } from "./csvManager";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

const SnappableManager = () => {
    const [status, setStatus] = useState({ status: IDLE });
    const [filetext, setFiletext] = useState("Browse...");
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
        if (!fileRef.current.files.length) {
            setStatus({
                status: ERROR,
                error: "You don't have a file to upload.",
            });
            return;
        }
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
                    error: "There was an error uploading your list of people.",
                });
            }
        })();
    });

    const handleFilenameChange = (event) => {
        setFiletext(event.target.files[0]?.name ?? "Browse");
    };

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
                role="group"
                className="mb-3"
                aria-label="Buttons for manipulating data"
            >
                <button
                    className="btn btn-purple"
                    onClick={downloadSnappables}
                    disabled={status.status === LOADING}
                >
                    Download as CSV
                </button>
            </div>
            <form onSubmit={uploadSnappables}>
                <FileUploadWrapper className="btn">
                    {filetext}
                    <input
                        type="file"
                        ref={fileRef}
                        disabled={status.status === LOADING}
                        accept=".csv"
                        onChange={handleFilenameChange}
                    />
                </FileUploadWrapper>
                <button type="submit" className="btn btn-purple">
                    Upload complete list of users
                </button>
                {status.status !== IDLE && (
                    <p>
                        {status.status === ERROR ? (
                            <span className="text-danger">{status.error}</span>
                        ) : (
                            <b>Loading...</b>
                        )}
                    </p>
                )}
            </form>
        </>
    );
};

export default SnappableManager;
