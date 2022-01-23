import React from "react";

const SubmissionBoxWrapper = ({ children }) => (
    <div className="col mb-4">
        <div className="row">
            <div className="col col-lg-8">
                <div className="row align-items-start snap-submission-column-div">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

export default SubmissionBoxWrapper;
