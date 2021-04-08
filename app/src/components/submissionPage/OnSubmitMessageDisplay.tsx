import React from "react";
import styled from "styled-components";

const SnapSuccessText = styled.p`
    text-align: right;
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #b6faa2;
    margin-right: 10px;
`;

const OnSubmitMessageDisplay: React.FunctionComponent = (props: {
    confirmation: Boolean;
}) => {
    if (props.confirmation) {
        return <SnapSuccessText>Snap submitted!</SnapSuccessText>;
    } else {
        return <p></p>;
    }
};

export default OnSubmitMessageDisplay;
