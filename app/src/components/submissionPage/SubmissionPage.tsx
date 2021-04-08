import React from "react";
import SubmissionTextBox from "./SubmissionTextBox";
import MentionElements from "../../types/MentionElements";
import { getCurrentUserName } from "../../firebase/users/UserService";
import YourSnaps from "./YourSnaps";

const SubmissionPage = (props: { snappables: MentionElements[] }) => {
    return (
        <>
            <h1>Hi {getCurrentUserName()}</h1>
            <SubmissionTextBox
                snappables={props.snappables}
                user={getCurrentUserName()}
            />
            <YourSnaps />
        </>
    );
};

export default SubmissionPage;
