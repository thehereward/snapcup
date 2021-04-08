import React from "react";
import SubmissionTextBox from "./SubmissionTextBox";
import { getCurrentUserName } from "../../firebase/AuthService";

const SubmissionPage = () => {
    return (
        <>
            <h1>Hi {getCurrentUserName()}</h1>
            <SubmissionTextBox />
        </>
    );
};

export default SubmissionPage;
