import React, { useState, useEffect, useCallback } from "react";
import SnappableManager from "./SnappableManager";
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
        <>
            <hr />
            <h2>Admin Console</h2>
            <SnappableManager />
            <hr />
            <CurrentCup cups={cups} updateCup={updateCups} setCup={setCups} />
        </>
    );
};

export default AdminConsole;
