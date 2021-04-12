import React from "react";
import AdminCurrentSnapsDisplay from "./AdminCurrentSnapsDisplay";
import CurrentCupHeader from "./CurrentCupHeader";
import { SectionHeaderUnderline } from "../AdminConsoleStyles";
import { CupWithId } from "../../../types/Cup";

const CurrentCup: React.FunctionComponent = (props: {
    cup: CupWithId | undefined;
    updateCup: () => void;
    setCup;
}) => {
    return (
        <div className="CurrentCup">
            <CurrentCupHeader cup={props.cup} updateCup={props.updateCup} />
            <SectionHeaderUnderline />
            <AdminCurrentSnapsDisplay
                cup={props.cup}
                updateCup={props.updateCup}
                setCup={props.setCup}
            />
        </div>
    );
};

export default CurrentCup;
