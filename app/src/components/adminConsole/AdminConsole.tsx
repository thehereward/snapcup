import React, { useState, useEffect, useCallback } from "react";
import SnappableManager from "./SnappableManager";
import CurrentCup from "./currentCup/CurrentCup";
import { getCurrentCupIfExists } from "../../firebase/cups/CupService";
import Cup from "../../types/Cup";
import { Entity } from "../../types/Entity";

const AdminConsole = () => {
    const [cup, setCup] = useState<Entity<Cup> | undefined>(false);

    const updateCup = () => {
        (async () => {
            try {
                const res = await getCurrentCupIfExists();
                setCup(res);
            } catch (err) {
                console.error(err);
            }
        })();
    };

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
