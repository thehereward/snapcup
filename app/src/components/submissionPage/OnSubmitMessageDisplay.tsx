import React from "react";

const OnSubmitMessageDisplay = (props: { confirmation: Boolean }) => {
    if (props.confirmation) {
        return (
            <p className="colour-success helper-text font-size-12">
                Snap submitted!
            </p>
        );
    } else {
        return <p></p>;
    }
};

export default OnSubmitMessageDisplay;
