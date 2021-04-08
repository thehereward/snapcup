import React from "react";
import SubmissionTextBox from "./SubmissionTextBox";
import { getCurrentUserName } from "../../firebase/AuthService";
import YourSnaps from "./YourSnaps";

const SubmissionPage = () => {
    return (
        <>
            <h1>Hi {getCurrentUserName()}</h1>
            <SubmissionTextBox />
            <YourSnaps />
        </>
    );
};

export default SubmissionPage;
