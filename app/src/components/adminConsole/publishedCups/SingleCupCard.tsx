import React from "react";
import { Link } from "react-router-dom";
import { Cup, Entity } from "../../../types";
import ExportSnaps from "../ExportSnaps";
import { useDownloadSnaps, STATUS } from "../csvTools";

function formatTimePublished(date: Date): string {
    return (
        "Published: " +
        date.toLocaleString(undefined, {
            year: "numeric",
            month: "long",
            day: "2-digit",
        })
    );
}

const SingleCupCard = (props: { cup: Entity<Cup> }) => {
    const { status, downloadSnaps } = useDownloadSnaps(props.cup.id);
    const formattedPublishedTime =
        props.cup.timePublished == undefined
            ? ""
            : formatTimePublished(props.cup.timePublished);

    return (
        <div className="col-sm-6 col-lg-4 mb-4" key={props.cup.id}>
            <div className="bg-colour-highlight-1 h-100 rounded-3 shadow-lg">
                <div className="fw-bold font-family-open-sans colour-text-normal d-flex flex-column w-100 h-100 p-4">
                    <p className="font-size-18 mb-1">{props.cup.name}</p>
                    <p className="font-size-14 mb-1">
                        {formattedPublishedTime}
                    </p>
                    <Link
                        to={`/manage/cups/${props.cup.id}`}
                        className="btn button-secondary rounded-pill font-size-16 text-decoration-none my-1"
                    >
                        Manage Cup
                    </Link>
                    <Link
                        to={`/cups/${props.cup.id}`}
                        className="btn button-secondary rounded-pill font-size-16 text-decoration-none my-1"
                    >
                        View Snaps
                    </Link>
                    <button
                        className={`button-secondary rounded-pill font-size-16 my-1`}
                        onClick={downloadSnaps}
                        disabled={status === STATUS.LOADING}
                    >
                        Download Snaps
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SingleCupCard;
