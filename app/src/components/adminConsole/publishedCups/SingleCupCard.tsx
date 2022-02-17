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
                className="background-colour-purple-textbook cursor_pointer hover-background-purple-hover h-100 rounded-3 shadow-lg"
                onClick={onClick}
            >
                <div className="fw-bold font-family-open-sans colour-text-normal d-flex flex-column w-100 h-100 p-4">
                    <p className="font-size-18 mb-1">{props.cup.name}</p>
                    <p className="font-size-14 mb-1">
                        {formattedPublishedTime}
                    </p>
                    <ExportSnaps cup={props.cup} />
                </div>
            </div>
        </div>
    );
};

export default SingleCupCard;
