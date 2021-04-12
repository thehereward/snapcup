import React from "react";
import { CupWithId } from "../../../types/Cup";
import CurrentCupOpennessButton from "./CurrentCupOpennessButton";
import CurrentCupPublishButton from "./CurrentCupPublishButton";

const CurrentCupOptionsBar: React.FunctionComponent = (props: {
    cup: CupWithId;
    setCup;
    updateIsCup: () => void;
}) => {
    return (
        <>
            <CurrentCupOpennessButton cup={props.cup} setCup={props.setCup} />
            <CurrentCupPublishButton
                cup={props.cup}
                updateIsCup={props.updateIsCup}
            >
                Publish SnapCup
            </CurrentCupPublishButton>
        </>
    );
};

export default CurrentCupOptionsBar;
