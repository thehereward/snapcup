import React from "react";
import { Cup, Entity } from "../../../types";
import CupListItem from "./CupListItem";

const AllCurrentCupsDisplay = (props: { cups: Entity<Cup>[] }) => {
    const cups = props.cups;

    if (cups.length == 0) {
        return (
            <p className="font-weight-bold colour-purple-hover font-size-16">
                No cup yet. Create a new cup to let your users get snapping!
            </p>
        );
    }

    const cupsList = cups.map((cup) => {
        return <CupListItem key={cup.id} cup={cup} />;
    });

    function horizontalRule(index: number) {
        return <hr key={`hr-${index}`} />;
    }

    return (
        <div>
            {cupsList.reduce((prev, next, index) => (
                <>
                    {prev}
                    {horizontalRule(index)}
                    {next}
                </>
            ))}
        </div>
    );
};

export default AllCurrentCupsDisplay;
