import React, { useState, useEffect, useCallback } from "react";
import SnappableManager from "./SnappableManager";
import CurrentCup from "./currentCup/CurrentCup";
import { getCurrentCupIfExists } from "../../firebase/cups/CupService";
import Cup from "../../types/Cup";

const AdminConsole = () => {
    const [cup, setCup] = useState<Cup | undefined>(false);

    const updateCup = useCallback(() => {
        (async () => {
            try {
                const res = await getCurrentCupIfExists();
                setCup(res);
            } catch (err) {
                console.error(err);
            }
        })();
    }, [setCup]);

    useEffect(updateCup, [updateCup]);

    return (
        <>
            <hr />
            <h2>Admin Console</h2>
            <SnappableManager />
            <hr />
            <CurrentCup cup={cup} updateCup={updateCup} setCup={setCup} />
        </>
    );
};

export default AdminConsole;
