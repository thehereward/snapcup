import React, { useState, useCallback } from "react";
import getSnaps from "../../firebase/snaps/GetSnaps";
import { snapsToCsvDownload } from "./csvManager";
import { Cup, Entity } from "../../types";
import styled from "styled-components";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

const ErrorMessage = styled.p`
    font-family: var(--open-sans);
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: var(--text-error);
    text-align: center;
`;

const ExportSnaps: React.FunctionComponent = (props: { cup: Entity<Cup> }) => {
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
                className={`button-secondary`}
                onClick={downloadSnaps}
                disabled={status.status === LOADING}
            >
                Export Snaps
            </button>
            {error != "" && <ErrorMessage>{error}</ErrorMessage>}
        </>
    );
};

export default ExportSnaps;
