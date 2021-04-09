import React, { useEffect, useState, useRef, useCallback } from "react";
import AdminCurrentSnapsDisplay from "./AdminCurrentSnapsDisplay";
import CurrentCupHeader from "./CurrentCupHeader";
import { getExistsUnpublished } from "../../../firebase/cups/CupService";

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
            <AdminCurrentSnapsDisplay isCup={props.isCup} />
        </div>
    );
};

export default CurrentCup;
