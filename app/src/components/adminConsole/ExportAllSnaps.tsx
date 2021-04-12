import React, { useState, useCallback } from "react";
import getSnaps from "../../firebase/snaps/GetSnaps";
import { snapsToCsvContent, csvContentToCsvDownload } from "./csvManager";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

const ExportAllSnaps = () => {
    const [status, setStatus] = useState({ status: IDLE });

    function snapsToCsvDownload(csvContent, filename = "snaps.csv") {
        stringToFileDownload(csvContent, filename, "text/csv;charset=utf-8;");
    }

    function stringToFileDownload(
        content: string,
        filename: string,
        type = "text/csv;charset=utf-8;"
    ) {
        var blob = new Blob([content], { type });
        var link = document.createElement("a");
        if (link.download !== undefined) {
            // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = "hidden";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }

    const downloadSnaps = useCallback(() => {
        setStatus({ status: LOADING });
        (async () => {
            try {
                const snappables = await getSnaps();
                csvContentToCsvDownload(
                    snapsToCsvContent(snappables),
                    "snaps.csv"
                );
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

    return (
        <div>
            <h1>Export</h1>
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
