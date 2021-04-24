import React from "react";
import CreateCupButton from "./CreateCupButton";
import { SectionHeader } from "../AdminConsoleStyles";
import MiniElleImg from "../../transferable/MiniElleImg";
import { Cup, Entity } from "../../../types";

const CurrentCupHeader: React.FunctionComponent = (props: {
    cups: Entity<Cup>[];
}) => {
    return (
        <div>
            <div id="currentCupHeader" className="row">
                <div className="col-md-4">
                    <SectionHeader>
                        <MiniElleImg />
                        Current Snap Cups
                    </SectionHeader>
                </div>
                <div className="col-md-8">
                    <CreateCupButton cups={props.cups} />
                </div>
            </div>
        </div>
    );
};

export default CurrentCupHeader;
