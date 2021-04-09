import React from "react";
import CreateCupButton from "./CreateCupButton";

const CurrentCupHeader: React.FunctionComponent = (props: {
    isCup: Boolean;
    isOpen: Boolean;
}) => {
    return (
        <div id="currentCupHeader">
            <h5>Current SnapCups</h5>
            <CreateCupButton isCup={props.isCup} isOpen={props.isOpen} />
        </div>
    );
};

export default CurrentCupHeader;
