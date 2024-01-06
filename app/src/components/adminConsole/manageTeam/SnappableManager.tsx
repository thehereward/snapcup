import React, { useState, useRef, useCallback } from "react";
import { Entity, Snap, Snappable } from "../../../types";
import { snappablesToCsvDownload, readFileAndUpload } from "../csvTools";
import FileUploadError from "../FileUploadError";
import DownloadButton from "./DownloadButton";
import SnappablesTable from "./SnappablesTable";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

interface Status {
    status: string;
    error?: string;
}

const SnappableManager = (props: {
    currentSnaps?: Entity<Snap>[];
    snappablePeople: Snappable[];
    setSnappablePeople: React.Dispatch<React.SetStateAction<Snappable[]>>;
    cupId: string;
}) => {
    const [status, setStatus] = useState<Status>({ status: IDLE });
    const [filename, setFilename] = useState<String | null>(null);
    const fileRef = useRef(null);

    const onClickDownload = () => {
        try {
            setStatus({ status: LOADING });
            snappablesToCsvDownload(props.snappablePeople);
            setStatus({ status: IDLE });
        } catch (error) {
            setStatus({ status: ERROR, error: error.message });
        }
    };

    const uploadSnappables = useCallback(
        (event) => {
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
                    await readFileAndUpload(
                        props.cupId,
                        fileRef.current.files[0]
                    );
                    setStatus({ status: IDLE });
                    setFilename(null);
                    fileRef.current.value = "";
                } catch (err) {
                    console.error(err);
                    let message =
                        "There was an error uploading your list of people.";
                    if (err instanceof FileUploadError) {
                        message = err.message;
                    }
                    setStatus({
                        status: ERROR,
                        error: message,
                    });
                }
            })();
        },
        [setStatus, setFilename]
    );

    const handleFilenameChange = (event) => {
        setFilename(event.target.files[0]?.name ?? null);
    };

    return (
        <>
            <header className="mb-2 d-flex justify-content-between">
                <h2>Manage Team</h2>
                <DownloadButton
                    onClick={onClickDownload}
                    disabled={status.status === LOADING}
                    label="Download current snappable people as CSV."
                />
            </header>
            <p className="styled-horizontal-rule" />
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
            <form onSubmit={uploadSnappables} className="my-3">
                <span className="btn btn-outline-primary me-2 btn-sm file-upload-wrapper ">
                    {filename ??
                        "Browse files to upload a list of snappable people..."}
                    <input
                        className="background-colour-white"
                        type="file"
                        ref={fileRef}
                        disabled={status.status === LOADING}
                        accept=".csv"
                        onChange={handleFilenameChange}
                    />
                </span>
                {filename && (
                    <button type="submit" className="btn btn-primary btn-sm">
                        Upload complete list of users
                    </button>
                )}
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
            <SnappablesTable
                cupId={props.cupId}
                snappables={props.snappablePeople}
                currentSnaps={props.currentSnaps}
                setSnappables={props.setSnappablePeople.bind(this)}
            />
        </>
    );
};

export default SnappableManager;
