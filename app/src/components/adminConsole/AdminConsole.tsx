import React, { useState, useEffect, useCallback } from "react";
import SnappableManager from "./manageTeam/SnappableManager";
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

    const updateIsCup = useCallback(() => {
        getExistsUnpublished()
            .then((res: Boolean) => {
                setIsCup(res);
            })
            .catch((e) => console.log(e));
    }, [setIsCup]);

    return (
        <div className="my-3">
            <SnappableManager />
            <CurrentCup
                isCup={isCup}
                isOpen={false}
                updateIsCup={updateIsCup}
            />
        </div>
    );
};

export default AdminConsole;
