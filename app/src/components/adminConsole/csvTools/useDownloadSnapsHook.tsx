import React, { useState, useCallback } from "react";
import getSnaps from "../../../firebase/snaps/GetSnaps";
import { snapsToCsvDownload } from ".";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

export const STATUS = {
    LOADING,
    IDLE,
    ERROR,
};

export default function useDownloadSnaps(id: string) {
    const [error, setError] = useState<string>("");
    const [status, setStatus] = useState(IDLE);

    const downloadSnaps = useCallback(() => {
        setStatus(LOADING);
        (async () => {
            try {
                const snaps = await getSnaps(id);
                snapsToCsvDownload(snaps);
                setStatus(IDLE);
            } catch (err) {
                console.error(err);
                setStatus(ERROR);
                setError("There was an error loading snaps.");
            }
        })();
    }, []);

    return { error, status, downloadSnaps };
}
