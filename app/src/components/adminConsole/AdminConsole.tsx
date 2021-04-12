import React, { useState, useEffect, useCallback } from "react";
import SnappableManager from "./manageTeam/SnappableManager";
import CurrentCup from "./currentCup/CurrentCup";
import { getAllCups } from "../../firebase/cups/CupService";
import Cup from "../../types/Cup";
import { Entity } from "../../types/Entity";

const AdminConsole = () => {
    const [cups, setCups] = useState<Entity<Cup>[]>([]);

    const updateCups = () => {
        (async () => {
            try {
                const res = await getAllCups();
                setCups(res);
            } catch (err) {
                console.error(err);
            }
        })();
    };

    useEffect(() => {
        updateCups();
    }, [setCups, getAllCups]);

    return (
        <div className="my-3">
            <SnappableManager />
            <hr />
            <CurrentCup cups={cups} updateCup={updateCups} setCup={setCups} />
        </div>
    );
};

export default AdminConsole;
