import React from "react";
import Cup from "../../../types/Cup";
import CurrentCupOpennessButton from "./CurrentCupOpennessButton";
import CurrentCupPublishButton from "./CurrentCupPublishButton";
import CurrentCupExportSnaps from "./CurrentCupExportSnaps";
import CurrentCupDeleteButton from "./CurrentCupDeleteButton";
import { Entity } from "../../../types/Entity";

const CurrentCupOptionsBar: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
}) => {
    return (
        <>
            <CurrentCupExportSnaps cup={props.cup} />
            <CurrentCupDeleteButton cup={props.cup} />
            <CurrentCupOpennessButton cup={props.cup} />
            <CurrentCupPublishButton cup={props.cup} />
        </>
    );
};

export default CurrentCupOptionsBar;
