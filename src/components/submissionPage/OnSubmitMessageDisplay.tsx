import React from "react";

const OnSubmitMessageDisplay: React.FunctionComponent = (props: { confirmation: Boolean }) => {
    if (props.confirmation) {
        return <p>Snap submitted!</p>
    } else {
        return <p></p>
    }
}

export default OnSubmitMessageDisplay;