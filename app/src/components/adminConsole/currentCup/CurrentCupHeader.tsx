import React from "react";
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
    isOpen: Boolean;
}) => {
    return (
        <div>
            <YourSnapsHeader>
                <MiniElleImg src={Elle} />
                Current SnapCup
            </YourSnapsHeader>
            <CreateCupButton isCup={props.isCup} isOpen={props.isOpen} />
        </div>
    );
};

export default CurrentCupHeader;
