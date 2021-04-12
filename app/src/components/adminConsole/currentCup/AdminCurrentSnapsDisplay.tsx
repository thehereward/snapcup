import React, { useEffect, useState } from "react";
import {
    getCurrentCupName,
    getCurrentCupId,
} from "../../../firebase/cups/CupService";
import { MessageDisplay, CupNameDisplay } from "../AdminConsoleStyles";
import CurrentCupOptionsBar from "./CurrentCupOptionsBar";
import { CupWithId } from "../../../types/Cup";

const AdminCurrentSnapsDisplay: React.FunctionComponent = (props: {
    cup: CupWithId | undefined;
    updateCup: () => void;
    setCup;
}) => {
    const [currentCupName, setCurrentCupName] = useState<String>("");
    const [currentCupId, setCurrentCupId] = useState<String>("");
    useEffect(() => {
        getCurrentCupName()
            .then((res: String) => {
                setCurrentCupName(res);
            })
            .catch((e) => console.log(e));
        getCurrentCupId()
            .then((res: String) => {
                setCurrentCupId(res);
            })
            .catch((e) => console.log(e));
    }, [
        getCurrentCupName,
        setCurrentCupName,
        getCurrentCupId,
        setCurrentCupId,
    ]);
    if (!(props.cup == undefined)) {
        console.log(props.cup);
        return (
            <div className="d-flex">
                <CupNameDisplay>{props.cup.name}</CupNameDisplay>
                <div className="flex-grow-1" />
                <CurrentCupOptionsBar cup={props.cup} setCup={props.setCup} />
            </div>
        );
    } else {
        return (
            <MessageDisplay>
                No cup yet. Create a new cup to let your users get snapping!
            </MessageDisplay>
        );
    }
};

export default AdminCurrentSnapsDisplay;
