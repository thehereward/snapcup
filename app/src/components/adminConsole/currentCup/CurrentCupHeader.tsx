import React from "react";
import CreateCupButton from "./CreateCupButton";
import { SectionHeader } from "../AdminConsoleStyles";
import Elle from "../../../images/Elle";
import styled from "styled-components";
import { CupWithId } from "../../../types/Cup";

export const MiniElleImg = styled(Elle)`
    height: 66px;
    width: auto;
    vertical-align: text-bottom;
    margin-right: 19px;
`;

const CurrentCupHeader: React.FunctionComponent = (props: {
    cup: CupWithId | undefined;
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
