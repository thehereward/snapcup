import React from "react";
import styled from "styled-components";

const ErrorMessage = styled.p`
    text-align: right;
    font-family: Open Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: #fc4528;
    margin-right: 10px;
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
