import React, { useCallback, useState, useEffect } from "react";
import { CurrentCupOptionsButton } from "../AdminConsoleStyles";
import Cup from "../../../types/Cup";
import { setCupPublished } from "../../../firebase/cups/CupService";
import { Entity } from "../../../types/Entity";

const CurrentCupPublishButton: React.FunctionComponent = (props: {
    cup: Entity<Cup>;
    updateIsCup: () => void;
}) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handlePublish = useCallback(() => {
        (async () => {
            try {
                setLoading(true);
                await setCupPublished(props.cup.id);
                setLoading(false);
                setError("");
                props.updateIsCup();
            } catch (err) {
                console.error(err);
                setError("Error!");
            }
        })();
    }, [props.cup, setLoading, setCupPublished, setError, props.updateIsCup]);

    return (
        <CurrentCupOptionsButton onClick={handlePublish}>
            Publish SnapCup
        </CurrentCupOptionsButton>
    );
};

export default CurrentCupPublishButton;
