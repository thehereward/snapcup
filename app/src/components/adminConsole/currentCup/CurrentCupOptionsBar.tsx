import React from "react";
import Cup from "../../../types/Cup";
import CurrentCupOpennessButton from "./CurrentCupOpennessButton";
import CurrentCupPublishButton from "./CurrentCupPublishButton";
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
        </>
    );
};

export default CurrentCupOptionsBar;
