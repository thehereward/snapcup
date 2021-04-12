import React from "react";
import CreateCupButton from "./CreateCupButton";
import { SectionHeader } from "../AdminConsoleStyles";
import Elle from "../../../images/Elle";
import styled from "styled-components";
import Cup from "../../../types/Cup";
import { Entity } from "../../../types/Entity";

export const MiniElleImg = styled(Elle)`
    height: 66px;
    width: auto;
    vertical-align: text-bottom;
    margin-right: 19px;
`;

const CurrentCupHeader: React.FunctionComponent = (props: {
    cup: Entity<Cup> | undefined;
    updateCup: () => void;
}) => {
    return (
        <div>
            <div id="currentCupHeader" className="row">
                <div className="col-md-4">
                    <SectionHeader>
                        <MiniElleImg />
                        Current SnapCup
                    </SectionHeader>
                </div>
                <div className="col-md-8">
                    <CreateCupButton
                        cup={props.cup}
                        updateCup={props.updateCup}
                    />
                </div>
            </div>
        </div>
    );
};

export default CurrentCupHeader;
