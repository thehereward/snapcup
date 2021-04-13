import React from "react";
import Cup from "../../../types/Cup";
import CurrentCupOpennessButton from "./CurrentCupOpennessButton";
import CurrentCupPublishButton from "./CurrentCupPublishButton";
import CurrentCupExportSnaps from "./CurrentCupExportSnaps";
import { Entity } from "../../../types/Entity";

const CurrentCupOptionsBar: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
    updateCups: () => void;
}) => {
    return (
        <>
            <CurrentCupExportSnaps cup={props.cup} />
            <CurrentCupOpennessButton
                cup={props.cup}
                updateCups={props.updateCups}
            />
            <CurrentCupPublishButton
                cup={props.cup}
                updateIsCup={props.updateCups}
            />
        </>
    );
};

export default CurrentCupOptionsBar;
