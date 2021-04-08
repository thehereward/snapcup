import React, { useEffect, useState, useRef, useCallback } from "react";
import AdminCurrentSnapsDisplay from "./AdminCurrentSnapsDisplay";
import CurrentCupHeader from "./CurrentCupHeader";

const CurrentCup: React.FunctionComponent = (props: {
    isCup: Boolean;
    isOpen: Boolean;
}) => {
    return (
        <div className="CurrentCup">
            <CurrentCupHeader isCup={props.isCup} isOpen={props.isOpen} />
            <AdminCurrentSnapsDisplay isCup={props.isCup} />
        </div>
    );
};

export default CurrentCup;
