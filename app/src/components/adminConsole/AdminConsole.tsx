import React, { useState, useEffect, useCallback } from "react";
import SnappableManager from "./manageTeam/SnappableManager";
import CurrentCup from "./currentCup/CurrentCup";
import { getAllCups } from "../../firebase/cups/CupService";
import Cup from "../../types/Cup";
import { Entity } from "../../types/Entity";
import PublishedCups from "./publishedCups/PublishedCups";

const AdminConsole = ({ cups, setCups, updateCups }) => {
    function isCurrent(cup: Cup) {
        return !cup.isPublished;
    }

    useEffect(() => {
        updateCups();
    }, [setCups, getAllCups]);

    return (
        <div className="my-3">
            <SnappableManager />
            <hr />
            <CurrentCup
                cups={cups.filter(isCurrent)}
                updateCups={updateCups}
                setCup={setCups}
            />
            <hr />
            <PublishedCups
                cups={cups
                    .filter((cup) => cup.isPublished == true)
                    .sort((a, b) =>
                        a.timePublished < b.timePublished ? 1 : -1
                    )}
            />
        </div>
    );
};

export default AdminConsole;
