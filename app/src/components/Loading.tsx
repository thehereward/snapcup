import React from "react";
// @ts-ignore
import Elle from "../images/Elle";

const Loading = () => {
    return (
        <div className="single-column">
            <Elle />
            <div className="d-flex justify-content-center">
                <div
                    className="spinner-border mt-3 colour-primary"
                    role="status"
                >
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        </div>
    );
};

export default Loading;
