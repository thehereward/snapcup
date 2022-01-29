import React, { useCallback } from "react";
import { Cup, Entity } from "../../../types";
import { deleteCup } from "../../../firebase/cups/CupService";

const CurrentCupDeleteButton = (props: { cup: Entity<Cup> }) => {
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
    }, [deleteCup]);

    return (
        <button
            className="button-secondary rounded-pill font-size-16 warning"
            onClick={handleDelete}
        >
            Delete Snap Cup
        </button>
    );
};

export default CurrentCupDeleteButton;
