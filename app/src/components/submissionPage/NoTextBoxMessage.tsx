import React from "react";
import { ElleImg } from "./SnapSubmissionStyles";

const NoTextBoxMessage = ({ message }) => (
    <>
        <div className="col-sm-4 text-light text-center">
            <ElleImg />
        </div>
        <div className="col-sm-8 text-light">
            <h3>{message}</h3>
        </div>
    </>
);

export default NoTextBoxMessage;
