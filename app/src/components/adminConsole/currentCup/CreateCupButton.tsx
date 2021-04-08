import React, { useState } from "react";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

const CreateCupButton: React.FunctionComponent = (props: {
    isCup: Boolean;
    isOpen: Boolean;
}) => {
    const [status, setStatus] = useState({ status: IDLE });
    const createCup = () => {
        console.log("cup created");
    };
    if (!props.isCup) {
        return (
            <div>
                <button
                    type="button"
                    className="btn-createCup"
                    onClick={() => createCup()}
                    disabled={status.status === LOADING}
                >
                    + New SnapCup
                </button>
            </div>
        );
    } else {
        return null;
    }
};

export default CreateCupButton;
