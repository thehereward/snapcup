import React from "react";
import SubmissionTextBox from "./SubmissionTextBox";
import { getCurrentUserName } from "../../firebase/AuthService";
import MentionElements from "../../types/MentionElements";

const SubmissionPage = (props: { snappables: MentionElements[] }) => {
    return (
        <>
            <h1>Hi {getCurrentUserName()}</h1>
            <SubmissionTextBox
                snappables={props.snappables}
                user={getCurrentUserName()}
            />
        </>
    );
};

export default SubmissionPage;
