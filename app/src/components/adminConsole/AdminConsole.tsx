import React, { useState, useEffect, useCallback } from "react";
import SnappableManager from "./manageTeam/SnappableManager";
import CurrentCup from "./currentCup/CurrentCup";
import { streamAllCups } from "../../firebase/cups/CupService";
import { streamAllSnapsInCup } from "../../firebase/snaps/SnapService";
import Cup from "../../types/Cup";
import Snap from "../../types/Snap";
import Snappable from "../../types/Snappable";
import { streamAllSnappablePeople } from "../../firebase/users/GetSnappables";
import { Entity } from "../../types/Entity";
import PublishedCups from "./publishedCups/PublishedCups";

const AdminConsole = () => {
    const [cups, setCups] = useState<Entity<Cup>[]>([]);
    const [snaps, setSnaps] = useState<Entity<Snap>[]>([]);
    const [snappables, setSnappables] = useState<Snappable[]>([]);

    function isCurrent(cup: Cup) {
        return !cup.isPublished;
    }

    useEffect(() => {
        const unsubscribe = streamAllCups(
            (cups) => setCups(cups),
            (error) => console.error(error)
        );
        // clean up function
        return unsubscribe;
    }, [setCups]);

    useEffect(() => {
        if (cups.filter(isCurrent).length == 0) {
            return;
        }
        const unsubscribe = streamAllSnapsInCup(
            (snaps) => setSnaps(snaps),
            (error) => console.error(error),
            cups.filter(isCurrent)[0].id
        );
        // clean up function
        return unsubscribe;
    }, [setSnaps, cups]);

    useEffect(() => {
        const unsubscribe = streamAllSnappablePeople(
            (people) => {
                setSnappables(people);
            },
            (error) => console.error(error)
        );
        return unsubscribe;
    }, [setSnappables]);

    return (
        <div className="my-3">
            <SnappableManager
                currentSnaps={snaps}
                snappablePeople={snappables}
            />
            <hr />
            <CurrentCup cups={cups.filter(isCurrent)} />
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
