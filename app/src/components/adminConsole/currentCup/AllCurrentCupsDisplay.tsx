import React, { useState, useEffect } from "react";
import Cup from "../../../types/Cup";
import { Entity } from "../../../types/Entity";
import AdminCurrentSnapsDisplay from "./AdminCurrentSnapsDisplay";
import { CupNameDisplay, MessageDisplay } from "../AdminConsoleStyles";

const AllCurrentCupsDisplay: React.FunctionComponent = (props: {
    cups: Entity<Cup>[];
    updateCups: () => void;
    setCups;
}) => {
    const cupsList = props.cups.map((cup) => {
        if (cup.isPublished) {
            return null;
        } else {
            return (
                <div key={cup.id}>
                    <AdminCurrentSnapsDisplay
                        cup={cup}
                        updateCups={props.updateCups}
                        setCups={props.setCups}
                    />
                </div>
            );
        }
    });
    if (
        cupsList.some(function (el) {
            return el != null;
        })
    ) {
        return <div>{cupsList}</div>;
    } else {
        return (
            <MessageDisplay>
                No cup yet. Create a new cup to let your users get snapping!
            </MessageDisplay>
        );
    }
};

export default AllCurrentCupsDisplay;
