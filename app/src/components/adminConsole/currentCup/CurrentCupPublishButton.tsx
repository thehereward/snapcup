import React, { useCallback, useState, useEffect } from "react";
import { CurrentCupOptionsButton } from "../AdminConsoleStyles";
import { CupWithId } from "../../../types/Cup";
import { setCupPublished } from "../../../firebase/cups/CupService";

const CurrentCupPublishButton: React.FunctionComponent = (props: {
    cup: CupWithId;
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
