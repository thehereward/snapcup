import React from "react";
import { Cup, Entity } from "../../../types";
import CurrentCupOpennessButton from "./CurrentCupOpennessButton";
import CurrentCupPublishButton from "./CurrentCupPublishButton";
import CurrentCupDeleteButton from "./CurrentCupDeleteButton";
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
