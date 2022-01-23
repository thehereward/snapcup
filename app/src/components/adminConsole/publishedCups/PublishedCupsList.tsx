import React from "react";
import { Cup, Entity } from "../../../types";
import SingleCupCard from "./SingleCupCard";

const PublishedCupsList = (props: { cups: Entity<Cup>[] }) => {
    const listCups = props.cups.map((cup: Entity<Cup>) => {
        return <SingleCupCard cup={cup} key={cup.id} />;
    });
    if (props.cups.length > 0) {
        return <div className="row">{listCups}</div>;
    } else {
        return <p className="message-display">No published cups yet!</p>;
    }
};

export default PublishedCupsList;
