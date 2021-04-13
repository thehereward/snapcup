import React from "react";
import SectionHeading from "../../transferable/SectionHeading";
import PublishedCupsList from "./PublishedCupsList";
import Cup from "../../../types/Cup";
import { Entity } from "../../../types/Entity";

const PublishedCups: React.FunctionComponent = (props: {
    cups: Entity<Cup>[];
}) => {
    return (
        <div className="PublishedCups">
            <SectionHeading title={"Published Cups"} />
            <PublishedCupsList cups={props.cups} />
        </div>
    );
};

export default PublishedCups;
