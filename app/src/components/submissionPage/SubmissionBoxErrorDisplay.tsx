import React from "react";
import styled from "styled-components";
import { HelperText } from "./SnapSubmissionStyles";

const ErrorMessage = styled(HelperText)`
    color: var(--text-error);
`;

const SubmissionBoxErrorDisplay = (props: { error: string }) => {
    if (props.error.length > 0) {
        return <ErrorMessage>{props.error}</ErrorMessage>;
    } else {
        return <p></p>;
    }
};

export default SubmissionBoxErrorDisplay;
