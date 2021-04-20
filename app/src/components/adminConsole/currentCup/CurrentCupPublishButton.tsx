import React, { useCallback, useState, useEffect } from "react";
import { CurrentCupOptionsButton } from "../AdminConsoleStyles";
import { Cup, Entity } from "../../../types";
import { setCupPublished } from "../../../firebase/cups/CupService";

const CurrentCupPublishButton: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handlePublish = useCallback(async () => {
        if (
            !confirm(
                "Are you sure you want to publish this cup? This cannot be reversed!"
            )
        ) {
            return;
        }
        try {
            setLoading(true);
            await setCupPublished(props.cup.id);
            setLoading(false);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Error!");
        }
    }, [setLoading, setError]);

    return (
        <CurrentCupOptionsButton onClick={handlePublish}>
            Publish SnapCup
        </CurrentCupOptionsButton>
    );
};

export default CurrentCupPublishButton;
