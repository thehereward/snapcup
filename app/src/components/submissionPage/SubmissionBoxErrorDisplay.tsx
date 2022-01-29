import React from "react";

const SubmissionBoxErrorDisplay = (props: { error: string }) => {
    if (props.error.length > 0) {
        return (
            <p className="colour-error helper-text font-size-12">
                {props.error}
            </p>
        );
    } else {
        return <p></p>;
    }
};

export default SubmissionBoxErrorDisplay;
