import React from "react";
import AllCurrentCupsDisplay from "./AllCurrentCupsDisplay";
import CurrentCupHeader from "./CurrentCupHeader";
import { SectionHeaderUnderline } from "../AdminConsoleStyles";
import Cup from "../../../types/Cup";
import { Entity } from "../../../types/Entity";

const CurrentCup: React.FunctionComponent = (props: {
    cups: Entity<Cup>[];
    updateCups: () => void;
    setCups;
}) => {
    return (
        <div className="CurrentCup">
            <CurrentCupHeader cups={props.cups} updateCup={props.updateCups} />
            <SectionHeaderUnderline />
            <AllCurrentCupsDisplay
                cups={props.cups}
                updateCup={props.updateCups}
                setCups={props.setCups}
            />
        </div>
    );
};

export default CurrentCup;
