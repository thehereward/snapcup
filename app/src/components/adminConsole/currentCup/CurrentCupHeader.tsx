import React, { useEffect } from "react";
import CreateCupButton from "./CreateCupButton";
import styled, { css } from "styled-components";
import Elle from "../../../images/Elle.svg";

const YourSnapsHeader = styled.h2`
    font-family: Asap;
    font-weight: 500;
    font-size: 30px;
    line-height: 34px;
    color: var(--purple-selected);
    margin-bottom: 25px;
`;

const MiniElleImg = styled.img`
    height: 66px;
    width: auto;
    vertical-align: text-bottom;
    margin-right: 19px;
`;

const CurrentCupHeader: React.FunctionComponent = (props: {
    isCup: Boolean;
    updateIsCup: () => void;
}) => {
    return (
        <div id="currentCupHeader">
            <YourSnapsHeader>
                <MiniElleImg src={Elle} />
                <CreateCupButton
                    isCup={props.isCup}
                    updateIsCup={props.updateIsCup}
                />
            </YourSnapsHeader>
        </div>
    );
};

export default CurrentCupHeader;
