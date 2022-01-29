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
        <form className="form-inline">
            <label htmlFor="cupNameInput" className="sr-only">
                Cup Name
            </label>
            <input
                type="text"
                id="cupNameInput"
                className="form-control mb-2 mr-sm-2"
                value={newCupName}
                onChange={handleNCNChange}
                placeholder="Cup name"
            />
            <button
                type="submit"
                className="new-cup-button shadow-lg background-colour-purple-textbook hover-background-purple-selected font-family-open-sans colour-white font-weight-bold rounded-lg mb-2 font-size-18 border-0 ml-2"
                onClick={() => handleCreateClick()}
                disabled={status.status === LOADING || newCupName.length == 0}
            >
                + New Snap Cup
            </button>
        </form>
    );
};

export default CreateCupButton;
