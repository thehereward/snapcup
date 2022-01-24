import React from "react";
import CreateCupButton from "../adminConsole/currentCup/CreateCupButton";
import AllCurrentCupsDisplay from "../adminConsole/currentCup/AllCurrentCupsDisplay";
import { Cup } from "../../types";
import PublishedCupsList from "../adminConsole/publishedCups/PublishedCupsList";
import { useCups } from "../../firebase/hooks/UseCupsHook";
import SectionHeading from "../transferable/SectionHeading";

const AdminConsole = () => {
    const [cups] = useCups();
    function isCurrent(cup: Cup) {
        return !cup.isPublished;
    }
    function isPublished(cup: Cup) {
        return cup.isPublished;
    }
    return (
        <div className="my-3">
            <SectionHeading title="Create New Cup" />
            <CreateCupButton />
            <SectionHeading title="Unpublished Cups" />
            <AllCurrentCupsDisplay cups={cups.filter(isCurrent)} />
            <SectionHeading title="Previous Cups" />
            <PublishedCupsList
                cups={cups
                    .filter(isPublished)
                    .sort((a, b) =>
                        a.timePublished < b.timePublished ? 1 : -1
                    )}
            />
        </div>
    );
};

export default AdminConsole;
