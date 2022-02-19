import React from "react";

const SubmissionBoxWrapper = ({ children }) => (
    <div className="row mb-4">
        <div className="col offset-lg-1 col-lg-10 offset-xl-0 col-xl-7">
            <div className="bg-colour-highlight-1 p-3 rounded-3">
                <div className="row align-items-start justify-content-center">
                    {children}
                </div>
            </div>
        </div>
    </div>
);

export default SubmissionBoxWrapper;
