import React, { useState, useEffect } from "react";
import { createNewCup, GetCupNames } from "../../../firebase/cups/CupService";
import Cup from "../../../types/Cup";
import { NewCupButton } from "../AdminConsoleStyles";

const LOADING = "loading";
const IDLE = "idle";
const ERROR = "error";

const CreateCupButton: React.FunctionComponent = (props: {
    isCup: Boolean;
    updateIsCup: () => void;
}) => {
    const [status, setStatus] = useState({ status: IDLE });
    const [newCupName, setNewCupName] = useState<string>("");
    const [allCupNames, setAllCupNames] = useState<string[]>([]);

    useEffect(() => {
        GetCupNames()
            .then((res: string[]) => {
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
            props.updateIsCup();
        } catch (error) {
            console.log(error.tostring());
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
                <input
                    value={newCupName}
                    onChange={handleNCNChange}
                    placeholder="Name your new Cup..."
                />
                <NewCupButton
                    type="button"
                    className="btn-createCup"
                    onClick={() => handleCreateClick()}
                    disabled={
                        status.status === LOADING || newCupName.length == 0
                    }
                >
                    + New SnapCup
                </NewCupButton>
            </div>
        );
    } else {
        return null;
    }
};

export default CreateCupButton;
