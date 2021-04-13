import React from "react";
import Cup from "../../../types/Cup";
import CurrentCupOpennessButton from "./CurrentCupOpennessButton";
import CurrentCupPublishButton from "./CurrentCupPublishButton";
import { Entity } from "../../../types/Entity";

const CurrentCupOptionsBar: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
    setCups;
    updateCups: () => void;
}) => {
    return (
        <>
            <CurrentCupOpennessButton cup={props.cup} setCups={props.setCups} />
            <CurrentCupPublishButton
                cup={props.cup}
                updateCups={props.updateCups}
            />
        </>
    );
};

export default CurrentCupOptionsBar;
