import React from "react";
import styled from "styled-components";
import { HelperText } from "./SnapSubmissionStyles";

const SnapSuccessText = styled(HelperText)`
    color: #b6faa2;
`;

const OnSubmitMessageDisplay = (props: { confirmation: Boolean }) => {
    if (props.confirmation) {
        return <SnapSuccessText>Snap submitted!</SnapSuccessText>;
    } else {
        return <p></p>;
    }
};

export default OnSubmitMessageDisplay;
