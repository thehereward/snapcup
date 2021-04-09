import React, { useEffect, useState } from "react";
import { getCurrentCupName } from "../../../firebase/cups/CupService";
import { MessageDisplay, CupNameDisplay } from "../AdminConsoleStyles";
import CurrentCupOptionsBar from "./CurrentCupOptionsBar";

const AdminCurrentSnapsDisplay: React.FunctionComponent = (props: {
    isCup: Boolean;
    isOpen: Boolean;
}) => {
    const [currentCupName, setCurrentCupName] = useState<String>("");
    useEffect(() => {
        getCurrentCupName()
            .then((res: String) => {
                setCurrentCupName(res);
            })
            .catch((e) => console.log(e));
    }, [getCurrentCupName, setCurrentCupName]);
    if (props.isCup) {
        console.log(currentCupName);
        return (
            <CupNameDisplay>{currentCupName}</CupNameDisplay>
            // add snaps in current cup here
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
