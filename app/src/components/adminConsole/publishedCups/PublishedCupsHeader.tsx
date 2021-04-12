import React from "react";
import { SectionHeader } from "../AdminConsoleStyles";
import Elle from "../../../images/Elle";
import styled from "styled-components";

export const MiniElleImg = styled(Elle)`
    height: 66px;
    width: auto;
    vertical-align: text-bottom;
    margin-right: 19px;
`;

const PublishedCupsHeader: React.FunctionComponent = () => {
    return (
        <div id="currentCupHeader">
            <SectionHeader>
                <MiniElleImg />
                Published SnapCups
            </SectionHeader>
        </div>
    );
};

export default PublishedCupsHeader;
