import React from "react";
import AllCurrentCupsDisplay from "./AllCurrentCupsDisplay";
import CurrentCupHeader from "./CurrentCupHeader";
import { Cup, Entity } from "../../../types";

const CurrentCup = (props: { cups: Entity<Cup>[] }) => {
    return (
        <div className="CurrentCup">
            <CurrentCupHeader />
            <p className="styled-horizontal-rule" />
            <AllCurrentCupsDisplay cups={props.cups} />
        </div>
    );
};

export default CurrentCup;
