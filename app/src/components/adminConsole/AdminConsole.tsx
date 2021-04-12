import React, { useState, useEffect, useCallback } from "react";
import SnappableManager from "./manageTeam/SnappableManager";
import CurrentCup from "./currentCup/CurrentCup";
import { getAllCups } from "../../firebase/cups/CupService";
import Cup from "../../types/Cup";
import { Entity } from "../../types/Entity";
import PublishedCups from "./publishedCups/PublishedCups";

const AdminConsole = () => {
    const [cups, setCups] = useState<Entity<Cup>[]>([]);

    function isCurrent(cup: Cup) {
        return !cup.isPublished;
    }

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
            <CurrentCup
                cups={cups.filter(isCurrent)}
                updateCup={updateCups}
                setCup={setCups}
            />
            <hr />
            <PublishedCups
                cups={cups.filter((cup) => cup.isPublished == true)}
            />
        </div>
    );
};

export default AdminConsole;
