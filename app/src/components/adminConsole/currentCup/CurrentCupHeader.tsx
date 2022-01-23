import React from "react";
import CreateCupButton from "./CreateCupButton";
import { Cup, Entity } from "../../../types";
import Elle from "../../../images/Elle";

const CurrentCupHeader = (props: { cups: Entity<Cup>[] }) => {
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
                    <CreateCupButton cups={props.cups} />
                </div>
            </div>
        </div>
    );
};

export default CurrentCupHeader;
