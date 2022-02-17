import React from "react";
import { Cup, Entity } from "../../../types";
import CurrentCupOpennessButton from "./CurrentCupOpennessButton";
import CurrentCupPublishButton from "./CurrentCupPublishButton";
import CurrentCupDeleteButton from "./CurrentCupDeleteButton";
import ExportSnaps from "../ExportSnaps";

const CurrentCupOptionsBar = (props: { cup: Entity<Cup> }) => {
    return (
        <>
            <CurrentCupOpennessButton cup={props.cup} />
            <ExportSnaps cup={props.cup} />
            <CurrentCupPublishButton cup={props.cup} />
            <CurrentCupDeleteButton cup={props.cup} />
        </>
    );
};

export default CurrentCupOptionsBar;
