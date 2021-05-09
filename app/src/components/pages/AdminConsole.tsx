import React from "react";
import CurrentCup from "../adminConsole/currentCup/CurrentCup";
import { Cup } from "../../types";
import PublishedCups from "../adminConsole/publishedCups/PublishedCups";
import { useCups } from "../../firebase/hooks/UseCupsHook";

const AdminConsole = () => {
    const [cups] = useCups();
    function isCurrent(cup: Cup) {
        return !cup.isPublished;
    }
    return (
        <div className="my-3">
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
