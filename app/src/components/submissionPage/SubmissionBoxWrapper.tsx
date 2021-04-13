import React from "react";
import { SnapSubmissionColumnDiv } from "./SnapSubmissionStyles";

const SubmissionBoxWrapper: React.FunctionComponent = ({ children }) => (
    <div className="col mb-4">
        <div className="row">
            <div className="col col-lg-8">
                <SnapSubmissionColumnDiv className="row justify-content-md-center">
                    {children}
                </SnapSubmissionColumnDiv>
            </div>
        </div>
    </div>
);

export default SubmissionBoxWrapper;
