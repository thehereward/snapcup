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
        <div className="col-sm-6 col-md-4 mb-4" key={props.cup.id}>
            <div className="cup-card" onClick={onClick}>
                <div className="cup-text">
                    <p className="cup-card-name">{props.cup.name}</p>
                    <p className="cup-card-date">{formattedPublishedTime}</p>
                    <ExportSnaps cup={props.cup} />
                </div>
            </div>
        </div>
    );
};

export default SingleCupCard;
