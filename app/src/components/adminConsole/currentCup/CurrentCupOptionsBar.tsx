import React from "react";
import Cup from "../../../types/Cup";
import CurrentCupOpennessButton from "./CurrentCupOpennessButton";
import CurrentCupPublishButton from "./CurrentCupPublishButton";
import { Entity } from "../../../types/Entity";

const CurrentCupOptionsBar: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
    setCup;
    updateCup: () => void;
}) => {
    return (
        <>
            <CurrentCupOpennessButton cup={props.cup} setCup={props.setCup} />
            <CurrentCupPublishButton
                cup={props.cup}
                updateIsCup={props.updateCup}
            />
        </>
    );
};

export default CurrentCupOptionsBar;
