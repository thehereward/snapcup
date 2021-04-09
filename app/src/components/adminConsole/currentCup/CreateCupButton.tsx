import React, { useState, useEffect } from "react";
import { createNewCup , GetCupNames } from "../../../firebase/cups/CupService";
import Cup from "../../../types/Cup";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

const CreateCupButton: React.FunctionComponent = (props: {
    isCup: Boolean;
    isOpen: Boolean;
}) => {
    const [status, setStatus] = useState({ status: IDLE });
    const [newCupName, setNewCupName] = useState<String>("");
    const [allCupNames, setAllCupNames] = useState<String[]>([]);

    useEffect(() => {
        GetCupNames()
            .then((res: String[]) => {
                setAllCupNames(res);
            })
            .catch((e) => console.log(e));
    }, [GetCupNames, setAllCupNames]);

    const handleCreateClick = () => {
        setStatus({ status: LOADING });
        const newCup: Cup = {
            isPublished: false,
            isOpen: false,
            timeCreated: new Date(),
            name: newCupName,
        };
        try {
            createNewCup(newCup);
            setNewCupName("");
            //TODO: change isCup
        } catch (error) {
            console.log(error.toString());
            console.log("error in firebase");
        }
        setStatus({ status: IDLE });
    };

    const handleNCNChange = (event) => {
        setNewCupName(event.target.value);
    };

    if (!props.isCup) {
        return (
            <div>
                <input value={newCupName} onChange={handleNCNChange} />
                <button
                    type="button"
                    className="btn-createCup"
                    onClick={() => handleCreateClick()}
                    disabled={
                        status.status === LOADING ||
                        newCupName.length == 0 ||
                        allCupNames.includes(newCupName)
                    }
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
