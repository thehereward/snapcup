import React from "react";
import AllCurrentCupsDisplay from "./AllCurrentCupsDisplay";
import CurrentCupHeader from "./CurrentCupHeader";
import { StyledHorizontalRule } from "../../transferable/styles";
import { Cup, Entity } from "../../../types";

const CurrentCup: React.FunctionComponent = (props: {
    cups: Entity<Cup>[];
}) => {
    return (
        <div className="CurrentCup">
            <CurrentCupHeader cups={props.cups} />
            <StyledHorizontalRule />
            <AllCurrentCupsDisplay cups={props.cups} />
        </div>
    );
};

export default CurrentCup;
