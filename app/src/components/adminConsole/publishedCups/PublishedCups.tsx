import React from "react";
import SectionHeading from "../../transferable/SectionHeading";
import PublishedCupsList from "./PublishedCupsList";
import { Cup, Entity } from "../../../types";

const PublishedCups = (props: { cups: Entity<Cup>[] }) => {
    return (
        <div className="PublishedCups">
            <SectionHeading title={"Previous Cups"} />
            <PublishedCupsList cups={props.cups} />
        </div>
    );
};

export default PublishedCups;
