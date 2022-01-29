import React from "react";

const OnSubmitMessageDisplay = (props: { confirmation: Boolean }) => {
    if (props.confirmation) {
        return (
            <div className="font-family-open-sans font-weight-bold colour-success font-size-12 ml-1">
                Snap submitted!
            </div>
        );
    } else {
        return <div></div>;
    }
};

export default OnSubmitMessageDisplay;
