import React from "react";
import Elle from "../../images/Elle";

const NoTextBoxMessage = ({ message }) => (
    <>
        <div className="col-sm-4 text-light text-center">
            <Elle className="elle-image" />
        </div>
        <div className="col-sm-8 text-light">
            <h3>{message}</h3>
        </div>
    </>
);

export default NoTextBoxMessage;
