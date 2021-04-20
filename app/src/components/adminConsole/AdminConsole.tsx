import React, { useState, useEffect } from "react";
import SnappableManager from "./manageTeam/SnappableManager";
import CurrentCup from "./currentCup/CurrentCup";
import { streamAllSnapsInCup } from "../../firebase/snaps/SnapService";
import { Cup, Entity, Snap } from "../../types";
import PublishedCups from "./publishedCups/PublishedCups";
import { useSnappablePeople } from "../../firebase/hooks/UseSnappablePeopleHook";
import { useCups } from "../../firebase/hooks/UseCupsHook";

const AdminConsole = () => {
    const [cups] = useCups();
    const [snaps, setSnaps] = useState<Entity<Snap>[]>([]);
    const [snappables] = useSnappablePeople();

    function isCurrent(cup: Cup) {
        return !cup.isPublished;
    }

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
