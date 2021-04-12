import React, { useState, useRef, useCallback } from "react";
import getSnappables from "../../../firebase/users/GetSnappables";
import {
    FileUploadWrapper,
    SectionHeader,
    SectionHeaderUnderline,
} from "../AdminConsoleStyles";
import { snappablesToCsvDownload, readFileAndUpload } from "../csvManager";
import DownloadButton from "./DownloadButton";
import SnappablesTable from "./SnappablesTable";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

const SnappableManager = () => {
    const [status, setStatus] = useState({ status: IDLE });
    const [filename, setFilename] = useState<String | null>(null);
    const fileRef = useRef(null);
    const onClickDownload = useCallback(() => {
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
    }, [setStatus]);

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
        setFilename(event.target.files[0]?.name ?? null);
    };

    return (
        <>
            <SectionHeader className="mb-2">
                Manage Team{" "}
                <DownloadButton
                    onClick={onClickDownload}
                    disabled={status.status === LOADING}
                />
            </SectionHeader>
            <SectionHeaderUnderline />
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
                <FileUploadWrapper className="btn btn-outline-purple mr-2 btn-sm">
                    {filename ??
                        "Browse files to upload a list of snappable people..."}
                    <input
                        type="file"
                        ref={fileRef}
                        disabled={status.status === LOADING}
                        accept=".csv"
                        onChange={handleFilenameChange}
                    />
                </FileUploadWrapper>
                {filename && (
                    <button type="submit" className="btn btn-purple btn-sm">
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
            <SnappablesTable />
        </>
    );
};

export default SnappableManager;
