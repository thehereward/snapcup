import React from "react";
import { useDownloadSnaps, STATUS } from "./csvTools";
import { Cup, Entity } from "../../types";

const ExportSnaps = (props: { cup: Entity<Cup> }) => {
    const cup = props.cup;
    const { error, status, downloadSnaps } = useDownloadSnaps(cup.id);

    return (
        <>
            <button
                className={`button-secondary rounded-pill font-size-16`}
                onClick={downloadSnaps}
                disabled={status === STATUS.LOADING}
            >
                Download Snaps
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
