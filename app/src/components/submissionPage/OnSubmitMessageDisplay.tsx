import React from "react";

const OnSubmitMessageDisplay = (props: { confirmation: Boolean }) => {
    if (props.confirmation) {
        return <p className="snap-success-text">Snap submitted!</p>;
    } else {
        return <p></p>;
    }
};

export default OnSubmitMessageDisplay;
