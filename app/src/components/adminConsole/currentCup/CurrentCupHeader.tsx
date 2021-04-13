import React from "react";
import CreateCupButton from "./CreateCupButton";
import { SectionHeader } from "../AdminConsoleStyles";
import MiniElleImg from "../../transferable/MiniElleImg";
import Cup from "../../../types/Cup";
import { Entity } from "../../../types/Entity";

const CurrentCupHeader: React.FunctionComponent = (props: {
    cups: Entity<Cup>[];
    updateCups: () => void;
}) => {
    return (
        <div>
            <div id="currentCupHeader" className="row">
                <div className="col-md-4">
                    <SectionHeader>
                        <MiniElleImg />
                        Current SnapCups
                    </SectionHeader>
                </div>
                <div className="col-md-8">
                    <CreateCupButton
                        cups={props.cups}
                        updateCups={props.updateCups}
                    />
                </div>
            </div>
        </div>
    );
};

export default CurrentCupHeader;
