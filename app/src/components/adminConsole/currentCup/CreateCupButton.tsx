import React, { useState } from "react";
import { createNewCup } from "../../../firebase/cups/CupService";
import { Cup, Entity } from "../../../types";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

const CreateCupButton: React.FunctionComponent = (props: {
    cups: Entity<Cup>[];
}) => {
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
        <form>
            <input
                value={newCupName}
                onChange={handleNCNChange}
                placeholder="Name your new Cup..."
            />
            <button
                type="submit"
                className="new-cup-button"
                onClick={() => handleCreateClick()}
                disabled={status.status === LOADING || newCupName.length == 0}
            >
                + New Snap Cup
            </button>
        </form>
    );
};

export default CreateCupButton;
