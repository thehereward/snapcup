import React from "react";

const SubmissionBoxErrorDisplay: React.FunctionComponent = (props: {
    error: string;
}) => {
    if (props.error.length > 0) {
        return <p>{props.error}</p>;
    } else {
        return <p></p>;
    }
};

export default SubmissionBoxErrorDisplay;
