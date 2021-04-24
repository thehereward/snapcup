import React, { useCallback, useState, useEffect } from "react";
import { CurrentCupOptionsButton } from "../AdminConsoleStyles";
import { Cup, Entity } from "../../../types";
import { deleteCup } from "../../../firebase/cups/CupService";

const CurrentCupDeleteButton: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleDelete = useCallback(async () => {
        if (
            !confirm(
                "Are you sure you want to DELETE this cup? All snaps will be lost!"
            )
        ) {
            return;
        }
        try {
            setLoading(true);
            await deleteCup(props.cup.id);
            setLoading(false);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Error!");
        }
    }, [setLoading, setError]);

    return (
        <CurrentCupOptionsButton className="warning" onClick={handleDelete}>
            Delete Snap Cup
        </CurrentCupOptionsButton>
    );
};

export default CurrentCupDeleteButton;
