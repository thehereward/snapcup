import React from "react";
import AdminCurrentSnapsDisplay from "./AdminCurrentSnapsDisplay";
import CurrentCupHeader from "./CurrentCupHeader";
import { SectionHeaderUnderline } from "../AdminConsoleStyles";

const CurrentCup: React.FunctionComponent = (props: {
    isCup: Boolean;
    isOpen: Boolean;
    updateIsCup: () => void;
}) => {
    return (
        <div className="CurrentCup">
            <CurrentCupHeader
                isCup={props.isCup}
                updateIsCup={props.updateIsCup}
            />
            <SectionHeaderUnderline />
            <AdminCurrentSnapsDisplay
                isCup={props.isCup}
                isOpen={props.isOpen}
            />
        </div>
    );
};

export default CurrentCup;
