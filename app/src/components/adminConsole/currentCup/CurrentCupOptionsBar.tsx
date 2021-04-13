import React from "react";
import Cup from "../../../types/Cup";
import CurrentCupOpennessButton from "./CurrentCupOpennessButton";
import CurrentCupPublishButton from "./CurrentCupPublishButton";
import CurrentCupDeleteButton from "./CurrentCupDeleteButton";
import { Entity } from "../../../types/Entity";
import ExportSnaps from "../ExportSnaps";

const CurrentCupOptionsBar: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
}) => {
    return (
        <>
            <ExportSnaps cup={props.cup} />
            <CurrentCupOpennessButton cup={props.cup} />
            <CurrentCupPublishButton cup={props.cup} />
            <CurrentCupDeleteButton cup={props.cup} className="warning" />
        </>
    );
};

export default CurrentCupOptionsBar;
