import React from "react";

const SubmissionBoxErrorDisplay = (props: { error: string }) => {
    if (props.error.length > 0) {
        return (
            <div className="font-family-open-sans font-weight-bold colour-error font-size-12 ml-1">
                {props.error}
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default SubmissionBoxErrorDisplay;
