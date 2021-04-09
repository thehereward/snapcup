import React, { useState, useEffect } from "react";
import SnappableManager from "./SnappableManager";
import CurrentCup from "./currentCup/CurrentCup";
import { getExistsUnpublished } from "../../firebase/cups/CupService";

const AdminConsole = () => {
    const [isCup, setIsCup] = useState<Boolean>(false);

    useEffect(() => {
        getExistsUnpublished()
            .then((res: Boolean) => {
                setIsCup(res);
            })
            .catch((e) => console.log(e));
    }, [getExistsUnpublished, setIsCup]);

    const updateIsCup = () => {
        getExistsUnpublished()
            .then((res: Boolean) => {
                setIsCup(res);
            })
            .catch((e) => console.log(e));
    };

    return (
        <>
            <hr />
            <h2>Admin Console</h2>
            <SnappableManager />
            <CurrentCup
                isCup={isCup}
                isOpen={false}
                updateIsCup={updateIsCup}
            />
        </>
    );
};

export default AdminConsole;
