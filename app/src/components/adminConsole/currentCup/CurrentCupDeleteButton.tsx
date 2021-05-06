import React, { useCallback, useState, useEffect } from "react";
import { CurrentCupOptionsButton } from "../AdminConsoleStyles";
import { Cup, Entity } from "../../../types";
import { deleteCup } from "../../../firebase/cups/CupService";

const CurrentCupDeleteButton: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
}) => {
    const handleDelete = useCallback(async () => {
        if (
            !confirm(
                "Are you sure you want to DELETE this cup? All snaps will be lost!"
            )
        ) {
            return;
        }
        try {
            await deleteCup(props.cup.id);
        } catch (err) {
            console.error(err);
        }
    });

    return (
        <CurrentCupOptionsButton className="warning" onClick={handleDelete}>
            Delete Snap Cup
        </CurrentCupOptionsButton>
    );
};

export default CurrentCupDeleteButton;
