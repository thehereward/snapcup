import React from "react";

const SubmissionBoxWrapper = ({ children }) => (
    <div className="col mb-4">
        <div className="row">
            <div className="col col-lg-8">
                <div className="row align-items-start justify-content-center background-colour-purple-textbook py-3 rounded-lg">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

export default SubmissionBoxWrapper;
