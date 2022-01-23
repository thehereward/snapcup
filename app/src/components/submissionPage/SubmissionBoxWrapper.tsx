import React from "react";
import { SnapSubmissionColumnDiv } from "./SnapSubmissionStyles";

const SubmissionBoxWrapper = ({ children }) => (
    <div className="col mb-4">
        <div className="row">
            <div className="col col-lg-8">
                <SnapSubmissionColumnDiv className="row align-items-start">
                    {children}
                </SnapSubmissionColumnDiv>
            </div>
        </div>
    </div>
);

export default SubmissionBoxWrapper;
