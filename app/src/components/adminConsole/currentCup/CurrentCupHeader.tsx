import React, { useEffect } from "react";
import CreateCupButton from "./CreateCupButton";

const CurrentCupHeader: React.FunctionComponent = (props: {
    isCup: Boolean;
    updateIsCup: () => void;
}) => {
    return (
        <div id="currentCupHeader">
            <h5>Current SnapCup </h5>
            <CreateCupButton
                isCup={props.isCup}
                updateIsCup={props.updateIsCup}
            />
        </div>
    );
};

export default CurrentCupHeader;
