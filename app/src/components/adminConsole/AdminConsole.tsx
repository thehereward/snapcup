import React, { useState, useEffect, useCallback } from "react";
import SnappableManager from "./manageTeam/SnappableManager";
import CurrentCup from "./currentCup/CurrentCup";
import {
    getCurrentCupIfExists,
    getExistsUnpublished,
} from "../../firebase/cups/CupService";
import Cup from "../../types/Cup";
import ExportAllSnaps from "./ExportAllSnaps";

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
        <div className="my-3">
            <SnappableManager />
            <CurrentCup cup={cup} setCup={setCup} updateCup={updateCup} />
            <ExportAllSnaps />
        </div>
    );
};

export default AdminConsole;
