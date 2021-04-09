import React from "react";
import CreateCupButton from "./CreateCupButton";
import {
    SectionHeader,
    MiniElleImg,
    NewCupButton,
} from "../AdminConsoleStyles";
//import Elle from "../../../images/Elle.svg";

const CurrentCupHeader: React.FunctionComponent = (props: {
    isCup: Boolean;
    updateIsCup: () => void;
}) => {
    return (
        <div className="container">
            <div id="currentCupHeader" className="row">
                <div className="col-md-3">
                    <SectionHeader>SnapCups</SectionHeader>
                </div>
                <div className="col-md-9">
                    <CreateCupButton
                        isCup={props.isCup}
                        updateIsCup={props.updateIsCup}
                    />
                </div>
            </div>
        </div>
    );
};

export default CurrentCupHeader;
