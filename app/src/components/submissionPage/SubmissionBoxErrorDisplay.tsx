import React from "react";
import styled from "styled-components";
import { HelperText } from "./SnapSubmissionStyles";

const ErrorMessage = styled(HelperText)`
    color: #fc4528;
`;

const SubmissionBoxErrorDisplay: React.FunctionComponent = (props: {
    error: string;
}) => {
    if (props.error.length > 0) {
        return <ErrorMessage>{props.error}</ErrorMessage>;
    } else {
        return <p></p>;
    }
};

export default SubmissionBoxErrorDisplay;
