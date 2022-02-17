import React, { useState, useCallback } from "react";
import getSnaps from "../../firebase/snaps/GetSnaps";
import { snapsToCsvDownload } from "./csvTools";
import { Cup, Entity } from "../../types";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

const ExportSnaps = (props: { cup: Entity<Cup> }) => {
    const cup = props.cup;
    const [error, setError] = useState<string>("");
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
                });
                setError("There was an error loading snaps.");
            }
        })();
    }, []);

    return (
        <>
            <button
                className={`button-secondary rounded-pill font-size-16`}
                onClick={downloadSnaps}
                disabled={status.status === LOADING}
            >
                Export Snaps
            </button>
            {error != "" && (
                <p className="font-family-open-sans fw-bold text-center colour-error font-size-12">
                    {error}
                </p>
            )}
        </>
    );
};

export default ExportSnaps;
