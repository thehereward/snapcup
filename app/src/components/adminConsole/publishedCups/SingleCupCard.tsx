import React from "react";
import { useNavigate } from "react-router-dom";
import { Cup, Entity } from "../../../types";
import ExportSnaps from "../ExportSnaps";

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
    const formattedPublishedTime =
        props.cup.timePublished == undefined
            ? ""
            : formatTimePublished(props.cup.timePublished);

    const navigate = useNavigate();
    function onClick() {
        navigate(`/cups/${props.cup.id}`);
    }

    return (
        <div className="col-sm-6 col-lg-4 mb-4" key={props.cup.id}>
            <div
                className="cup-card h-100 rounded-lg shadow-lg"
                onClick={onClick}
            >
                <div className="cup-text d-flex flex-column w-100 h-100">
                    <p className="cup-card-name mb-0">{props.cup.name}</p>
                    <p className="cup-card-date mb-0">
                        {formattedPublishedTime}
                    </p>
                    <ExportSnaps cup={props.cup} />
                </div>
            </div>
        </div>
    );
};

export default SingleCupCard;
