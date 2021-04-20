import React from "react";
import { Cup, Entity } from "../../../types";
import { MessageDisplay } from "../AdminConsoleStyles";
import SingleCupCard from "./SingleCupCard";

const PublishedCupsList: React.FunctionComponent = (props: {
    cups: Entity<Cup>[];
}) => {
    const listCups = props.cups.map((cup: Entity<Cup>) => {
        return <SingleCupCard cup={cup} key={cup.id} />;
    });
    if (props.cups.length > 0) {
        return <div className="row">{listCups}</div>;
    } else {
        return <MessageDisplay>No published cups yet!</MessageDisplay>;
    }
};

export default PublishedCupsList;
