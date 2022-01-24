import React from "react";
import CreateCupButton from "./CreateCupButton";
import Elle from "../../../images/Elle";

const CurrentCupHeader = () => {
    return (
        <div>
            <div id="currentCupHeader" className="row">
                <div className="col-12">
                    <h2>
                        <Elle className="mini-elle-image" />
                        Current Snap Cups
                    </h2>
                </div>
                <div className="col-12">
                    <CreateCupButton />
                </div>
            </div>
        </div>
    );
};

export default CurrentCupHeader;
