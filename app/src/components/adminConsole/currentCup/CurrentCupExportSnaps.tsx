import React, { useState, useCallback } from "react";
import { CurrentCupOptionsButton } from "../AdminConsoleStyles";
import getSnaps from "../../../firebase/snaps/GetSnaps";
import { snapsToCsvDownload } from "../csvManager";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

const CurrentCupExportSnaps = ({ cup }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    let buttonText = `Export Snaps`;
    if (error) {
        buttonText += "- " + error;
    }

    const [status, setStatus] = useState({ status: IDLE });

    const downloadSnaps = useCallback(() => {
        setStatus({ status: LOADING });
        (async () => {
            try {
                const snaps = await getSnaps(cup.id);
                snapsToCsvDownload(snaps);
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
        <CurrentCupOptionsButton
            onClick={downloadSnaps}
            disabled={status.status === LOADING}
        >
            {buttonText}
        </CurrentCupOptionsButton>
    );
};

export default CurrentCupExportSnaps;
