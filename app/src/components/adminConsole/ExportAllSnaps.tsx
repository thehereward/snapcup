import React, { useState, useCallback } from "react";
import getSnaps from "../../firebase/snaps/GetSnaps";
import { snapsToCsvContent, csvContentToCsvDownload } from "./csvManager";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

const ExportAllSnaps = () => {
    const [status, setStatus] = useState({ status: IDLE });

    const downloadSnaps = useCallback(() => {
        setStatus({ status: LOADING });
        (async () => {
            try {
                const snaps = await getSnaps();
                csvContentToCsvDownload(snapsToCsvContent(snaps), "snaps.csv");
                setStatus({ status: IDLE });
            } catch (err) {
                console.error(err);
                setStatus({
                    status: ERROR,
                    error: "There was an error loading snaps.",
                });
            }
        })();
    }, []);

    return (
        <div>
            <h1>Export all snaps</h1>
            <p>
                To get all of the snaps sent, press the download snaps button.
            </p>
            <div
                className="btn-group ml-2"
                role="group"
                aria-label="Buttons for manipulating data"
            >
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => downloadSnaps()}
                    disabled={status.status === LOADING}
                >
                    Download as CSV
                </button>
            </div>
        </div>
    );
};

export default ExportAllSnaps;
