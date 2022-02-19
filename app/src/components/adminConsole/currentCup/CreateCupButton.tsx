import React, { useState } from "react";
import { createNewCup } from "../../../firebase/cups/CupService";
import { Cup } from "../../../types";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

const CreateCupButton = () => {
    const [status, setStatus] = useState({ status: IDLE });
    const [newCupName, setNewCupName] = useState<string>("");

    const handleCreateClick = () => {
        setStatus({ status: LOADING });
        const newCup: Cup = {
            isPublished: false,
            isOpen: false,
            timeCreated: new Date(),
            name: newCupName,
            timePublished: null,
        };
        try {
            createNewCup(newCup);
            setNewCupName("");
        } catch (error) {
            console.log(error.toString());
        }
        setStatus({ status: IDLE });
    };

    const handleNCNChange = (event) => {
        setNewCupName(event.target.value);
    };

    return (
        <form className="row">
            <label htmlFor="cupNameInput" className="visually-hidden">
                Cup Name
            </label>
            <div className="col">
                <input
                    type="text"
                    id="cupNameInput"
                    className="form-control mb-2 me-sm-2 h-100"
                    value={newCupName}
                    onChange={handleNCNChange}
                    placeholder="Cup name"
                />
            </div>
            <div className="col-auto">
                <button
                    type="submit"
                    className="h-100 new-cup-button shadow-lg bg-colour-highlight-1 bg-colour-primary-on-hover font-family-open-sans colour-white fw-bold rounded-3 mb-2 font-size-18 border-0 ms-2"
                    onClick={() => handleCreateClick()}
                    disabled={
                        status.status === LOADING || newCupName.length == 0
                    }
                >
                    + New Snap Cup
                </button>
            </div>
        </form>
    );
};

export default CreateCupButton;
